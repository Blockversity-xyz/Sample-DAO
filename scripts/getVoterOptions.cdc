import ExampleDAO from "../contracts/DAO/ExampleDAO.cdc"

pub fun main(address: Address): {UInt64: Int} {
  let account = getAccount(address)

      let voterRef = account.getCapability(/public/ExampleDAOVoter)
        .borrow<&ExampleDAO.Voter>()
        ?? panic("Could not borrow Voter reference")

        return voterRef.getVotedOptions()
}

