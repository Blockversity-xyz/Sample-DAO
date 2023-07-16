/** @format */

export const getProposals = () => {
  return `
import GTokenExampleDAO from 0xc61f695fe4f80614

pub fun main(): [GTokenExampleDAO.Proposal] {
  return GTokenExampleDAO.getProposals()
}
  `;
};
