import ExampleDAO from "../contracts/DAO/ExampleDAO.cdc"

pub fun main(ProposalId: UInt64): ExampleDAO.Proposal {
  return ExampleDAO.getProposal(id: ProposalId)
}