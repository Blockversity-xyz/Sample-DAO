// This transaction is a template for a transaction to allow
// anyone to add a Vault resource to their account so that
// they can use the GovToken
import FungibleToken from "../../../contracts/utility/FungibleToken.cdc"
import GovToken from "../../../contracts/GovToken.cdc"
import MetadataViews from "../../../contracts/utility/MetadataViews.cdc"

transaction () {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a GovToken Vault
        if signer.borrow<&GovToken.Vault>(from: GovToken.VaultStoragePath) != nil {
            return
        }

        // Create a new GovToken Vault and put it in storage
        signer.save(
            <-GovToken.createEmptyVault(),
            to: GovToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&GovToken.Vault{FungibleToken.Receiver}>(
            GovToken.ReceiverPublicPath,
            target: GovToken.VaultStoragePath
        )

        // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
        signer.link<&GovToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            GovToken.VaultPublicPath,
            target: GovToken.VaultStoragePath
        )
    }
}