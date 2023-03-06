// This transaction creates a new BlockVersityDAO Proposer and deposits
// it into an existing Proposer proxy resource on the specified account.
//
// Parameters:
// - proposerAddress: The Proposer account address.
//
// This transaction will fail if the authorizer does not have the BlockVersityDAO.Administrator
// resource.
//
// This transaction will fail if the Proposer account does not have
// an BlockVersityDAO.ProposerProxy resource. Use the setup_BlockVersityDAO_Proposer.cdc transaction to
// create a Proposer proxy in the Proposer account.
import BlockVersityDAO from "../../contracts/DAO/BlockVersityDAO.cdc"

transaction(proposerAddress: Address) {

    let resourceStoragePath: StoragePath
    let capabilityPrivatePath: CapabilityPath
    let proposerCapability: Capability<&BlockVersityDAO.Proposer>

    prepare(adminAccount: AuthAccount) {

        // These paths must be unique within the BlockVersityDAO contract account's storage
        self.resourceStoragePath = /storage/proposer_01     // e.g. /storage/proposer_01
        self.capabilityPrivatePath = /private/proposer_01 // e.g. private/proposer_01
        // Create a reference to the admin resource in storage.
        let tokenAdmin = adminAccount.borrow<&BlockVersityDAO.Admin>(from: BlockVersityDAO.AdminStoragePath)
            ?? panic("Could not borrow a reference to the admin resource")

        // Create a new Proposer resource and a private link to a capability for it in the admin's storage.
        let proposer <- tokenAdmin.createProposer()
        adminAccount.save(<- proposer, to: self.resourceStoragePath)
        self.proposerCapability = adminAccount.link<&BlockVersityDAO.Proposer>(
            self.capabilityPrivatePath,
            target: self.resourceStoragePath
        ) ?? panic("Could not link Proposer")

    }

    execute {
        // This is the account that the capability will be given to
        let proposerAccount = getAccount(proposerAddress)

        let capabilityReceiver = proposerAccount.getCapability
            <&BlockVersityDAO.ProposerProxy{BlockVersityDAO.ProposerProxyPublic}>
            (BlockVersityDAO.ProposerProxyPublicPath)
            .borrow() ?? panic("Could not borrow capability receiver reference")

        capabilityReceiver.setProposerCapability(capability: self.proposerCapability)
    }

}