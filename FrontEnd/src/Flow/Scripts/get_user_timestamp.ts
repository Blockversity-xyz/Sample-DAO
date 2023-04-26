export const getUserTimestamp = () => {
  return `
  import Whitelist from 0xa2f587819db4486e
  pub fun main(user: Address): UFix64? {
    let timestamp = Whitelist.addressInfo[user]
    return timestamp
  }
  `
}