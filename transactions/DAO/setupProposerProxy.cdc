// This transaction creates a new Proposer proxy resource and
// stores it in the signer's account.
//
// After running this transaction, the BlockVersityDAO administrator
// must run deposit_BlockVersityDAO_Proposer.cdc to deposit a Proposer resource
// inside the Proposer proxy.
import BlockVersityDAO from "../../contracts/DAO/DaoTest.cdc"

transaction {

    prepare(Member: AuthAccount) {

        let proposerProxy <- BlockVersityDAO.createProposerProxy()

        Member.save(
            <- proposerProxy,
            to: BlockVersityDAO.ProposerProxyStoragePath,
        )

        Member.link<&BlockVersityDAO.ProposerProxy{BlockVersityDAO.ProposerProxyPublic}>(
            BlockVersityDAO.ProposerProxyPublicPath,
            target: BlockVersityDAO.ProposerProxyStoragePath
        )
    }
}