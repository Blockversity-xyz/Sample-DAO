import ExampleDAO from "../../contracts/DAO/ExampleDAO.cdc"

transaction(_title: String, _description: String, _options: [String], _startAt: UFix64, _endAt: UFix64, _minHoldedGVTAmount: UFix64?) {
  let proposer: &ExampleDAO.Proposer
  let minHoldedBVTAmount:UFix64?

  prepare(signer: AuthAccount) {
    self.proposer = signer.getCapability(/private/ExampleDAOProposer).borrow<&ExampleDAO.Proposer>()
	    ?? panic("Could not borrow reference")

    self.minHoldedBVTAmount = _minHoldedGVTAmount != nil ? _minHoldedGVTAmount! : 0.0
  }



  execute {
    self.proposer.addTopic(
      title: _title,
      description: _description,
      options: _options,
      startAt: _startAt,
      endAt: _endAt,
      minHoldedGVTAmount: self.minHoldedBVTAmount
    )
  }
}