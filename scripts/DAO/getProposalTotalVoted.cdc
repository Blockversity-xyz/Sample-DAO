import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

pub fun main(ProposalId: UInt64): Int {
  return BlockVersityDAO.getProposal(id: ProposalId).getTotalVoted()
}