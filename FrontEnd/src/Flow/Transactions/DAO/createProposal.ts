/** @format */

export const createProposal = () => {
  return `
import ExampleDAO from 0x800a10d0fff7acd4

transaction(
  title: String,
  description: String,
  options: [String],
  startAt: UFix64,
  endAt: UFix64,
  minHoldedGVTAmount: UFix64?
  ) {
  let proposer: &ExampleDAO.ProposerProxy?
  let minHoldedBVTAmount:UFix64?

  prepare(signer: AuthAccount) {
    self.proposer = signer
        .borrow<&ExampleDAO.ProposerProxy>(from: ExampleDAO.ProposerProxyStoragePath)
        ?? panic("No Proposer Proxy available")


    self.minHoldedBVTAmount = minHoldedGVTAmount != nil ? minHoldedGVTAmount! : 0.0
  }



  execute {
    self.proposer?.addProposal(
      _title: title,
      _description: description,
      _options: options,
      _startAt: startAt,
      _endAt: endAt,
      _minHoldedGVTAmount: self.minHoldedBVTAmount
    ) ?? panic("No proposer Resource deposited yet")
  }
}
  `;
};
