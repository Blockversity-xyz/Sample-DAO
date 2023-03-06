import BlockVersityDAO from "../../contracts/DAO/DaoTest.cdc"

transaction(title: String, description: String, options: [String], startAt: UFix64, endAt: UFix64, minHoldedBVTAmount: UFix64?) {
  let proposer: &BlockVersityDAO.ProposerProxy?
  let minHoldedBVTAmount:UFix64?

  prepare(signer: AuthAccount) {
    self.proposer = signer
        .borrow<&BlockVersityDAO.ProposerProxy>(from: BlockVersityDAO.ProposerProxyStoragePath)
        ?? panic("No Proposer Proxy available")


    self.minHoldedBVTAmount = minHoldedBVTAmount != nil ? minHoldedBVTAmount! : 0.0
  }



  execute {
    self.proposer?.addProposal(
      _title: title,
      _description: description,
      _options: options,
      _startAt: startAt,
      _endAt: endAt,
      _minHoldedBVTAmount: self.minHoldedBVTAmount
    )
  }
}