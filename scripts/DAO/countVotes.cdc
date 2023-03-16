import ExampleDAO from "../../contracts/DAO/ExampleDAO.cdc"

pub fun main(ProposalId: UInt64): [UInt64] {
  return ExampleDAO.getTopic(id: ProposalId).count(size: 2)
}

