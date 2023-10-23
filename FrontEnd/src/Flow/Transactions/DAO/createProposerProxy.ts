/** @format */

export const setProxy = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

transaction {

  prepare(signer: AuthAccount) {

    let voter <- GTokenExampleDAO.initVoter()

    signer.save(<-voter, to: /storage/DemoGTokenExampleDAOVoter)
    signer.link<&GTokenExampleDAO.Voter>(
      /public/GTokenExampleDAOVoter,
      target: /storage/GTokenExampleDAOVoter
      
    )
  }
}
  `;
};
