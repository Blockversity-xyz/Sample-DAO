// This transaction is a template for a transaction to allow
// anyone to add a Vault resource to their account so that
// they can use the GovernanceToken
import FungibleToken from "../../contracts/utility/FungibleToken.cdc"
import GovernanceToken from "../../contracts/GovernanceToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"

transaction () {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a GovernanceToken Vault
        if signer.borrow<&GovernanceToken.Vault>(from: GovernanceToken.VaultStoragePath) != nil {
            return
        }

        // Create a new GovernanceToken Vault and put it in storage
        signer.save(
            <-GovernanceToken.createEmptyVault(),
            to: GovernanceToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&GovernanceToken.Vault{FungibleToken.Receiver}>(
            GovernanceToken.ReceiverPublicPath,
            target: GovernanceToken.VaultStoragePath
        )

        // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
        signer.link<&GovernanceToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            GovernanceToken.VaultPublicPath,
            target: GovernanceToken.VaultStoragePath
        )
    }
}