import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

pub fun main(): [BlockVersityDAO.Proposal] {
  return BlockVersityDAO.getProposals()
}