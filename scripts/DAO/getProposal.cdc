import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

pub fun main(ProposalId: UInt64): BlockVersityDAO.Proposal {
  return BlockVersityDAO.getProposal(id: ProposalId)
}