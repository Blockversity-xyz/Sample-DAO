export const getAllAddresses = () => {
  return `
  import AllowList from 0xa2f587819db4486e
  pub fun main():[Address] {
    let timestamp = Whitelist.addressInfo.keys
    return timestamp
  }
  `
}