import { BigInt, Address, BigDecimal } from "@graphprotocol/graph-ts";
import {
  PromiseCore,
  PromiseCreated,
  PromiseExecuted,
  PromiseJoined,
  PromisePaid,
  PromisePendingAmountClosed,
} from "../generated/PromiseCore/PromiseCore";
import { JoinablePromise, Pair } from "../generated/schema";

export function handlePromiseCreated(event: PromiseCreated): void {
  let joinablePromise = JoinablePromise.load(event.params.id.toString());
  if (joinablePromise === null) {
    joinablePromise = new JoinablePromise(event.params.id.toString());
    joinablePromise.creatorToken = event.params.creatorToken;
    joinablePromise.joinerToken = event.params.joinerToken;
    joinablePromise.expirationTimestamp = event.params.expirationTimestamp;
    joinablePromise.creatorTokenPriceInJoinerToken = event.params.creatorAmount.toBigDecimal().div(event.params.joinerAmount.toBigDecimal());
    joinablePromise.remainingPositionSize = event.params.creatorAmount;
    joinablePromise.creatorDebt = event.params.creatorAmount.div(BigInt.fromString("2"));
    joinablePromise.save();

    let pair = Pair.load(event.params.creatorToken.toHexString() && event.params.joinerToken.toHexString());
    if (pair === null) {
      pair = new Pair(event.params.creatorToken.toHexString() && event.params.joinerToken.toHexString());
    }
    if (pair.totalLiquidityCreatorToken != null) {
      pair.totalLiquidityCreatorToken = pair.totalLiquidityCreatorToken.plus(event.params.creatorAmount.div(BigInt.fromString("2")));
    } else {
      pair.totalLiquidityCreatorToken = event.params.creatorAmount.div(BigInt.fromString("2"));
    }

    pair.save();
  }
}

export function handlePromiseExecuted(event: PromiseExecuted): void {
  let joinablePromise = JoinablePromise.load(event.params.id.toString());
  let pair = Pair.load(joinablePromise.creatorToken.toHexString() && joinablePromise.joinerToken.toHexString());
  pair.totalLiquidityCreatorToken = pair.totalLiquidityCreatorToken.minus(event.params.creatorTokenAmount);
  pair.totalLiquidityJoinerToken = pair.totalLiquidityJoinerToken.minus(event.params.joinerTokenAmount);
  pair.save();
}

export function handlePromiseJoined(event: PromiseJoined): void {
  let joinablePromise = JoinablePromise.load(event.params.id.toString());
  joinablePromise.remainingPositionSize = joinablePromise.remainingPositionSize.minus(
    BigInt.fromString(event.params.amount.divDecimal(joinablePromise.creatorTokenPriceInJoinerToken).toString())
  );

  joinablePromise.save();
  let pair = Pair.load(joinablePromise.creatorToken.toHexString() && joinablePromise.joinerToken.toHexString());
  if (pair === null) {
    pair = new Pair(joinablePromise.creatorToken.toHexString() && joinablePromise.joinerToken.toHexString());
  }
  if (pair.totalLiquidityJoinerToken != null) {
    pair.totalLiquidityJoinerToken = pair.totalLiquidityJoinerToken.plus(event.params.amount);
  } else {
    pair.totalLiquidityJoinerToken = event.params.amount;
  }
  pair.save();
}

export function handlePromisePaid(event: PromisePaid): void {
  let joinablePromise = JoinablePromise.load(event.params.id.toString());
  let pair = Pair.load(joinablePromise.creatorToken.toHexString() && joinablePromise.joinerToken.toHexString());
  let promiseCore = PromiseCore.bind(event.address);
  let promise = promiseCore.promises(event.params.id);
  if (promise.value0 === event.params.account) {
    joinablePromise.creatorDebt = BigInt.fromString("0");
    pair.totalLiquidityCreatorToken = pair.totalLiquidityCreatorToken.plus(event.params.amount);
  } else {
    joinablePromise.joinerDebt = joinablePromise.joinerDebt.minus(event.params.amount);
    pair.totalLiquidityJoinerToken = pair.totalLiquidityJoinerToken.plus(event.params.amount);
  }
  pair.save();
}

export function handlePromisePendingAmountClosed(event: PromisePendingAmountClosed): void {
  let joinablePromise = JoinablePromise.load(event.params.id.toString());
  joinablePromise.remainingPositionSize = BigInt.fromString("0");
  joinablePromise.creatorDebt = BigInt.fromString("0");
  joinablePromise.save();

  let pair = Pair.load(joinablePromise.creatorToken.toHexString() && joinablePromise.joinerToken.toHexString());
  pair.totalLiquidityCreatorToken = pair.totalLiquidityCreatorToken.minus(event.params.refund);
  pair.save();
}
