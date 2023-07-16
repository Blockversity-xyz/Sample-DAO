/** @format */

export const getVotedRecords = () => {
  return `
import GTokenExampleDAO from 0xc61f695fe4f80614

pub fun main():  [{ Address: Int }] {
  return GTokenExampleDAO.getVotedRecords()
}
  `;
};
