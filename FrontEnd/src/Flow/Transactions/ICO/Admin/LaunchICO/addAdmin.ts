/** @format */

export const addAdmin = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614

transaction {
  prepare(acct: AuthAccount) {
    // Claim a Admin resource
    let admin <- GovTokenPublicSale.claimAdmin()
    
    // Save the Admin to the account storage
    acct.save(<-admin, to: /storage/GovTokenPublicSaleAdmin)
    
    log("you are now an admin")
  }
}
  `;
};
