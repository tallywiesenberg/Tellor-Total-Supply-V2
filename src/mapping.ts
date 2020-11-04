import { BigInt } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/Tellor/Abi"
import { Tellor } from "../generated/Tellor/Tellor"
import { TotalSupply, Tip } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = TotalSupply.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {

    entity = new TotalSupply(event.transaction.from.toHex())

  }

  entity.timestamp = event.block.timestamp.toString()
  entity.blockNumber = event.block.number
  entity.totalSupply = Tellor.bind(event.address).totalSupply()
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity._newTellor = event.params._newTellor

  // Entities can be written to the store with `.save()`

  entity.save()

  let tip = Tip.load(event.transaction.from.toHex())

  if (tip == null) {

    tip = new Tip(event.transaction.from.toHex())

  }

  tip.timestamp = event.block.timestamp.toString()
  tip.blockNumber = event.block.number
  tip.requestId = Tellor.bind(event.address).getRequestIdByTimestamp(event.block.timestamp)
  tip.tip = Tellor.bind(event.address).getRequestVars(tip.requestId).value5

  tip.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Tellor.bind(event.address)
  // contract.totalSupply()
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getRequestIdByTimestamp(...)
  // - contract.getSubmissionsByTimestamp(...)
  // - contract.getAddressVars(...)
  // - contract.getSymbol(...)
  // - contract.getName(...)

  // - contract.getVariablesOnDeck(...)
  // - contract.getRequestIdByQueryHash(...)
  // - contract.getLastNewValueById(...)
  // - contract.isInDispute(...)
  // - contract.getNewValueCountbyRequestId(...)
  // - contract.balanceOfAt(...)
  // - contract.getUintVar(...)
  // - contract.getRequestIdByRequestQIndex(...)
  // - contract.didMine(...)
  // - contract.getMinersByRequestIdAndTimestamp(...)
  // - contract.balanceOf(...)
  // - contract.getStakerInfo(...)
  // - contract.getTimestampbyRequestIDandIndex(...)
  // - contract.getDisputeUintVars(...)
  // - contract.retrieveData(...)
  // - contract.allowedToTrade(...)
  // - contract.getCurrentVariables(...)
  // - contract.didVote(...)
  // - contract.getAllDisputeVars(...)
  // - contract.getRequestQ(...)
  // - contract.getMinedBlockNum(...)
  // - contract.getDisputeIdByDisputeHash(...)
  // - contract.allowance(...)
  // - contract.getRequestUintVars(...)
  // - contract.getRequestVars(...)
  // - contract.getLastNewValue(...)
}
