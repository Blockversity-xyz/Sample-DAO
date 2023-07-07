/** @format */

export const setTokenAdmin = () => {
  return `

import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import GovToken from 0x3c407ff30723099a

transaction {
  prepare(acct: AuthAccount) {
    // Claim an Admin resource
    let admin <- GovToken.claimAdminGVT()
    
    // Save the Admin to the account storage
    acct.save(<-admin, to: /storage/GovTokenAdmin)
    
    log("Done")
  }
}
  `;
};
