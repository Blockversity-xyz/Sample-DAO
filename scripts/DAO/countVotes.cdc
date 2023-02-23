import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

pub fun main(ProposalId: UInt64): [UInt64] {
  return BlockVersityDAO.getTopic(id: ProposalId).count(size: 2)
}
