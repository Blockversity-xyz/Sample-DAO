/**
 * Returns a string containing a Cadence script that imports the GTokenExampleDAO contract and calls its `getProposals` function.
 * @returns {string} The Cadence script.
 */
/** @format */

export const getProposals = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

pub fun main(): [GTokenExampleDAO.Proposal] {
  return GTokenExampleDAO.getProposals()
}
  `;
};
