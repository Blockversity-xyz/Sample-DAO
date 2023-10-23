/** @format */

export const createProposal = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

transaction(title: String, description: String, options: [String], startAt: UFix64?, endAt: UFix64?, minHoldedGVTAmount: UFix64?) {
  let proposer: &GTokenExampleDAO.Proposer

  prepare(signer: AuthAccount) {
    // Access the Proposer resource
    self.proposer = signer.borrow<&GTokenExampleDAO.Proposer>(from: /storage/DemoDAOProposer)
      ?? panic("Could not borrow reference to the Proposer")
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

  `;
};
