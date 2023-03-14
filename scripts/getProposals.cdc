import ExampleDAO from "../contracts/DAO/ExampleDAO.cdc"

pub fun main(): [ExampleDAO.Proposal] {
  return ExampleDAO.getProposals()
}