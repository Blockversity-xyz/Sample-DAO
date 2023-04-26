/** @format */

export const depositProposer = () => {
  return `
import ExampleDAO from 0x800a10d0fff7acd4

transaction(proposerAddress: Address) {

    let resourceStoragePath: StoragePath
    let capabilityPrivatePath: CapabilityPath
    let proposerCapability: Capability<&ExampleDAO.Proposer>

    prepare(adminAccount: AuthAccount) {

        // These paths must be unique within the ExampleDAO contract account's storage
        self.resourceStoragePath = /storage/proposer_01     // e.g. /storage/proposer_01
        self.capabilityPrivatePath = /private/proposer_01 // e.g. private/proposer_01
        // Create a reference to the admin resource in storage.
        let tokenAdmin = adminAccount.borrow<&ExampleDAO.Admin>(from: ExampleDAO.AdminStoragePath)
            ?? panic("Could not borrow a reference to the admin resource")

        // Create a new Proposer resource and a private link to a capability for it in the admin's storage.
        let proposer <- tokenAdmin.createProposer()
        adminAccount.save(<- proposer, to: self.resourceStoragePath)
        self.proposerCapability = adminAccount.link<&ExampleDAO.Proposer>(
            self.capabilityPrivatePath,
            target: self.resourceStoragePath
        ) ?? panic("Could not link Proposer")

    }

    execute {
        // This is the account that the capability will be given to
        let proposerAccount = getAccount(proposerAddress)

        let capabilityReceiver = proposerAccount.getCapability
            <&ExampleDAO.ProposerProxy{ExampleDAO.ProposerProxyPublic}>
            (ExampleDAO.ProposerProxyPublicPath)
            .borrow() ?? panic("Could not borrow capability receiver reference")

        capabilityReceiver.setProposerCapability(capability: self.proposerCapability)
    }

}
  `;
};
