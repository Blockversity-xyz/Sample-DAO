import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

transaction(_title: String, _description: String, _options: [String], _startAt: UFix64, _endAt: UFix64, _minHoldedBVTAmount: UFix64?) {
  let proposer: &BlockVersityDAO.Proposer
  let minHoldedBVTAmount:UFix64?

  prepare(signer: AuthAccount) {
    self.proposer = signer.getCapability(/private/BlockVersityDAOProposer).borrow<&BlockVersityDAO.Proposer>()
	    ?? panic("Could not borrow reference")

    self.minHoldedBVTAmount = _minHoldedBVTAmount != nil ? _minHoldedBVTAmount! : 0.0
  }



  execute {
    self.proposer.addTopic(
      title: _title,
      description: _description,
      options: _options,
      startAt: _startAt,
      endAt: _endAt,
      minHoldedBVTAmount: self.minHoldedBVTAmount
    )
  }
}