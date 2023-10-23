
export const createVoter = () => {
  return `
import GTokenExampleDAO from 0xba85020e56e96b74

transaction {

  prepare(signer: AuthAccount) {

    let voter <- GTokenExampleDAO.initVoter()

    signer.save(<-voter, to: /storage/GTokenExampleDAOVoter)
    signer.link<&GTokenExampleDAO.Voter>(
      /public/GTokenExampleDAOVoter,
      target: /storage/GTokenExampleDAOVoter

    )
  }
}
  `;
};
