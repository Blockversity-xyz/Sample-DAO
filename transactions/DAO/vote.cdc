import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

transaction(ProposalId: UInt64, OptionIndex: Int) {

  prepare(signer: AuthAccount) {
  let voter = signer
  .borrow<&BlockVersityDAO.Voter>(from: BlockVersityDAO.VoterStoragePath)
        ?? panic("Signer is not a Voter")
    voter.vote(ProposalId: ProposalId, optionIndex: OptionIndex)
  }

}
