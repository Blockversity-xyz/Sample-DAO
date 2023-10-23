/** @format */

export const getProposals = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

pub fun main(): [GTokenExampleDAO.Proposal] {
  return GTokenExampleDAO.getProposals()
}
  `;
};
