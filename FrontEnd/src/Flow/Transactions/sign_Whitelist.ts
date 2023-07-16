/** @format */

export const signAllowList = () => {
  return `
  import AllowList from 0xc61f695fe4f80614

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
