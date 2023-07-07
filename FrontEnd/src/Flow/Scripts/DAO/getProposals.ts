/** @format */

export const getProposals = () => {
  return `
import TokenExampleDAO from 0x3c407ff30723099a

pub fun main(): [TokenExampleDAO.Proposal] {
  return TokenExampleDAO.getProposals()
}
  `;
};
