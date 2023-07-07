import ExampleDAO from 0x01

transaction(title: String, description: String, options: [String], startAt: UFix64?, endAt: UFix64?, minHoldedGVTAmount: UFix64?) {
  let proposer: &ExampleDAO.Proposer

  prepare(signer: AuthAccount) {
    // Access the Proposer resource
    self.proposer = signer.borrow<&ExampleDAO.Proposer>(from: ExampleDAO.ProposerStoragePath)
      ?? panic("Could not borrow reference to Proposer")
  }

  execute {
    self.proposer.addProposal(
      title: title,
      description: description,
      options: options,
      startAt: startAt,
      endAt: endAt,
      minHoldedGVTAmount: minHoldedGVTAmount
    )
  }
}
