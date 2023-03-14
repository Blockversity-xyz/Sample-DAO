import ExampleDAO from "../contracts/DAO/ExampleDAO.cdc"

pub fun main(ProposalId: UInt64): Int {
  return ExampleDAO.getProposal(id: ProposalId).getTotalVoted()
}