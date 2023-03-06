import BlockVersityDAO from "../../contracts/DAO/DaoTest.cdc"

transaction {

  prepare(signer: AuthAccount) {
    let admin = signer
      .borrow<&BlockVersityDAO.Admin>(from: BlockVersityDAO.AdminStoragePath)
      ?? panic("Signer is not the admin")

    let proposer <- admin.createProposer()

    signer.save(<-proposer, to: /storage/BlockVersityDAOProposer)
    signer.link<&BlockVersityDAO.Proposer>(
      /private/BlockVersityDAOProposer,
      target: /storage/BlockVersityDAOProposer
    )
  }
}