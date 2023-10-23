/** @format */

export const vote = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

transaction(ProposalId: UInt64, OptionIndex: Int) {

  prepare(signer: AuthAccount) {
  let voter = signer
  .borrow<&GTokenExampleDAO.Voter>(from: /storage/DemoGTokenExampleDAOVoter)
        ?? panic("Signer is not a Voter")
    voter.vote(ProposalId: ProposalId, optionIndex: OptionIndex)
  }

}
  `;
};
