
export const createVoter = () => {
  return `
import GTokenExampleDAO from 0xc61f695fe4f80614

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
