/** @format */

export const setProxy = () => {
  return `
import TokenExampleDAO from 0x3c407ff30723099a

transaction {
  prepare(acct: AuthAccount) {
    // Claim a Proposer resource
    let proposer <- TokenExampleDAO.claimProposer()
    
    // Save the proposer to the account storage
    acct.save(<-proposer, to: /storage/Proposer)
    
    log("Done")
  }
}
  `;
};
