/** @format */

export const addAdmin = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a

transaction {
  prepare(acct: AuthAccount) {
    // Claim a Admin resource
    let admin <- GTokenPublicSale.claimAdmin()
    
    // Save the Admin to the account storage
    acct.save(<-admin, to: /storage/GTokenPublicSaleAdmin)
    
    log("you are now an admin")
  }
}
  `;
};
