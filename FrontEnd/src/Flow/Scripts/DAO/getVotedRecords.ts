/**
 * Returns a Cadence script that imports the GTokenExampleDAO contract and calls its `getVotedRecords` function.
 * @returns {string} Cadence script
 */
/** @format */

export const getVotedRecords = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

pub fun main():  [{ Address: Int }] {
  return GTokenExampleDAO.getVotedRecords()
}
  `;
};
