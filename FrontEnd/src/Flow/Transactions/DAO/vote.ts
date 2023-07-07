/** @format */

export const vote = () => {
  return `
import TokenExampleDAO from 0x3c407ff30723099a

transaction(ProposalId: UInt64, OptionIndex: Int) {

  prepare(signer: AuthAccount) {
  let voter = signer
  .borrow<&TokenExampleDAO.Voter>(from: TokenExampleDAO.VoterStoragePath)
        ?? panic("Signer is not a Voter")
    voter.vote(ProposalId: ProposalId, optionIndex: OptionIndex)
  }

}
  `;
};
