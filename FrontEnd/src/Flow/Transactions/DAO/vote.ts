/** @format */

export const vote = () => {
  return `
import GTokenExampleDAO from 0xc61f695fe4f80614

transaction(ProposalId: UInt64, OptionIndex: Int) {

  prepare(signer: AuthAccount) {
  let voter = signer
  .borrow<&GTokenExampleDAO.Voter>(from: GTokenExampleDAO.VoterStoragePath)
        ?? panic("Signer is not a Voter")
    voter.vote(ProposalId: ProposalId, optionIndex: OptionIndex)
  }

}
  `;
};
