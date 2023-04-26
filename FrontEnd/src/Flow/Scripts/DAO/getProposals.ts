/** @format */

export const getProposals = () => {
  return `
import ExampleDAO from 0x800a10d0fff7acd4

pub fun main(): [ExampleDAO.Proposal] {
  return ExampleDAO.getProposals()
}
  `;
};
