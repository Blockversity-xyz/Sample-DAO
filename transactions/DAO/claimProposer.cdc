import ExampleDAO from 0x01

transaction {
  prepare(acct: AuthAccount) {
    // Claim a Proposer resource
    let proposer <- ExampleDAO.claimProposer()
    
    // Save the proposer to the account storage
    acct.save(<-proposer, to: /storage/Proposer)
    
    log("Done")
  }
}