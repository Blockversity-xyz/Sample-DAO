import ExampleDAO from "../../../contracts/DAO/ExampleDAO.cdc"

transaction {

  prepare(signer: AuthAccount) {

    let voter <- ExampleDAO.initVoter()

    signer.save(<-voter, to: /storage/ExampleDAOVoter)
    signer.link<&ExampleDAO.Voter>(
      /public/ExampleDAOVoter,
      target: /storage/ExampleDAOVoter
    )
  }
}