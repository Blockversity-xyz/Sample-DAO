import SwapFactory from "../../../contracts/DEX/SwapFactory.cdc"

pub fun main(): [Address] {
  let len = SwapFactory.getAllPairsLength()
  if (len == 0) {
    return []
  } else {
    return SwapFactory.getSlicedPairs(from: 0, to: UInt64.max)
  }
}