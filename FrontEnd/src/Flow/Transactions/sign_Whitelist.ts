/** @format */

export const signWhitelist = () => {
  return `
  import Whitelist from 0xa2f587819db4486e

  transaction {
    // Setup address variable
    let address: Address

    prepare(acct: AuthAccount) {
      // Assign the signer's address into our address variable
      self.address = acct.address
    }

    execute {
      // Add address to the Whitelist
      Whitelist.addAddress(newAddress: self.address)
    }
  }
  `;
};
