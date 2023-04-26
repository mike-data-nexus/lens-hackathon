import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Account, Protocol } from "../generated/schema";

export namespace constants {
  export const protocol = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";
  export const BIGINT_ZERO = BigInt.fromI32(0);
  export const BIGINT_ONE = BigInt.fromI32(1);
}

export function GetProtocol(): Protocol {
  let protocol = Protocol.load(constants.protocol);

  if (!protocol) {
    protocol = new Protocol(constants.protocol);
    protocol.totalUsers = constants.BIGINT_ZERO;

    protocol.save();
  }

  return protocol as Protocol;
}

export function GetOrCreateAccount(account: Address): Account {
  let _account = Account.load(account);

  if (!account) {
    _account = new Account(account);

    _account.save();
  }

  return _account as Account;
}
