// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class JoinablePromise extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save JoinablePromise entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save JoinablePromise entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("JoinablePromise", id.toString(), this);
  }

  static load(id: string): JoinablePromise | null {
    return store.get("JoinablePromise", id) as JoinablePromise | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creatorToken(): Bytes {
    let value = this.get("creatorToken");
    return value.toBytes();
  }

  set creatorToken(value: Bytes) {
    this.set("creatorToken", Value.fromBytes(value));
  }

  get joinerToken(): Bytes {
    let value = this.get("joinerToken");
    return value.toBytes();
  }

  set joinerToken(value: Bytes) {
    this.set("joinerToken", Value.fromBytes(value));
  }

  get creatorTokenPrice(): BigInt {
    let value = this.get("creatorTokenPrice");
    return value.toBigInt();
  }

  set creatorTokenPrice(value: BigInt) {
    this.set("creatorTokenPrice", Value.fromBigInt(value));
  }

  get remainingPositionSize(): BigInt {
    let value = this.get("remainingPositionSize");
    return value.toBigInt();
  }

  set remainingPositionSize(value: BigInt) {
    this.set("remainingPositionSize", Value.fromBigInt(value));
  }

  get creatorDebt(): BigInt {
    let value = this.get("creatorDebt");
    return value.toBigInt();
  }

  set creatorDebt(value: BigInt) {
    this.set("creatorDebt", Value.fromBigInt(value));
  }

  get joinerDebt(): BigInt {
    let value = this.get("joinerDebt");
    return value.toBigInt();
  }

  set joinerDebt(value: BigInt) {
    this.set("joinerDebt", Value.fromBigInt(value));
  }

  get numOfJoiners(): BigInt {
    let value = this.get("numOfJoiners");
    return value.toBigInt();
  }

  set numOfJoiners(value: BigInt) {
    this.set("numOfJoiners", Value.fromBigInt(value));
  }

  get expirationTimestamp(): BigInt {
    let value = this.get("expirationTimestamp");
    return value.toBigInt();
  }

  set expirationTimestamp(value: BigInt) {
    this.set("expirationTimestamp", Value.fromBigInt(value));
  }
}

export class Pair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Pair entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Pair entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Pair", id.toString(), this);
  }

  static load(id: string): Pair | null {
    return store.get("Pair", id) as Pair | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalLiquidityCreatorToken(): BigInt {
    let value = this.get("totalLiquidityCreatorToken");
    return value.toBigInt();
  }

  set totalLiquidityCreatorToken(value: BigInt) {
    this.set("totalLiquidityCreatorToken", Value.fromBigInt(value));
  }

  get totalLiquidityJoinerToken(): BigInt {
    let value = this.get("totalLiquidityJoinerToken");
    return value.toBigInt();
  }

  set totalLiquidityJoinerToken(value: BigInt) {
    this.set("totalLiquidityJoinerToken", Value.fromBigInt(value));
  }
}
