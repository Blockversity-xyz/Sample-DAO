// This transaction creates a new Proposer proxy resource and
// stores it in the signer's account.
//
// After running this transaction, the ExampleDAO administrator
// must run deposit_ExampleDAO_Proposer.cdc to deposit a Proposer resource
// inside the Proposer proxy.
import ExampleDAO from "../../../contracts/DAO/ExampleDAO.cdc"

transaction {

    prepare(Member: AuthAccount) {

        let proposerProxy <- ExampleDAO.createProposerProxy()

        Member.save(
            <- proposerProxy,
            to: ExampleDAO.ProposerProxyStoragePath,
        )

        Member.link<&ExampleDAO.ProposerProxy{ExampleDAO.ProposerProxyPublic}>(
            ExampleDAO.ProposerProxyPublicPath,
            target: ExampleDAO.ProposerProxyStoragePath
        )
    }
}