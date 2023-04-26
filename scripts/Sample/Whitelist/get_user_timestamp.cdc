import Whitelist from "../../../contracts/Whitelist.cdc"

pub fun main(user: Address): UFix64? {
  let timestamp = Whitelist.addressInfo[user]
  return timestamp
}
