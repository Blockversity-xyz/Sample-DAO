import SwapInterfaces from "../../../contracts/DEX/SwapInterfaces.cdc"
import SwapConfig from "../../../contracts/DEX/SwapConfig.cdc"

pub fun main(pairAddr: Address): [AnyStruct] {
  let pairPublicRef = getAccount(pairAddr)
    .getCapability<&{SwapInterfaces.PairPublic}>(SwapConfig.PairPublicPath)
    .borrow()
    ?? panic("cannot borrow reference to PairPublic resource")

  return pairPublicRef.getPairInfo()
}