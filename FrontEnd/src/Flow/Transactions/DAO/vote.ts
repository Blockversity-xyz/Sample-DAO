/** @format */

export const vote = () => {
  return `
import ExampleDAO from 0x800a10d0fff7acd4

transaction(ProposalId: UInt64, OptionIndex: Int) {

  prepare(signer: AuthAccount) {
  let voter = signer
  .borrow<&ExampleDAO.Voter>(from: ExampleDAO.VoterStoragePath)
        ?? panic("Signer is not a Voter")
    voter.vote(ProposalId: ProposalId, optionIndex: OptionIndex)
  }

}
  `;
};
