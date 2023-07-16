/** @format */

export const setTokenAdmin = () => {
  return `

import FungibleToken from 0xc61f695fe4f80614
import NonFungibleToken from 0xc61f695fe4f80614
import GToken from 0xc61f695fe4f80614

transaction {
  prepare(acct: AuthAccount) {
    // Claim an Admin resource
    let admin <- GToken.claimAdminGVT()
    
    // Save the Admin to the account storage
    acct.save(<-admin, to: /storage/GTokenAdmin)
    
    log("Done")
  }
}
  `;
};
