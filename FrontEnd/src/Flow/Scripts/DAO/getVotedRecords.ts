/** @format */

export const getVotedRecords = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

pub fun main():  [{ Address: Int }] {
  return GTokenExampleDAO.getVotedRecords()
}
  `;
};
