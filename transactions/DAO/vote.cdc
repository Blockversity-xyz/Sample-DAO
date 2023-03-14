import ExampleDAO from "../../contracts/DAO/ExampleDAO.cdc"

transaction(ProposalId: UInt64, OptionIndex: Int) {

  prepare(signer: AuthAccount) {
  let voter = signer
  .borrow<&ExampleDAO.Voter>(from: ExampleDAO.VoterStoragePath)
        ?? panic("Signer is not a Voter")
    voter.vote(ProposalId: ProposalId, optionIndex: OptionIndex)
  }

}
