import Whitelist from "../../../contracts/Whitelist.cdc"

pub fun main():[Address] {
  let addresses = Whitelist.addressInfo.keys
  return addresses
}
