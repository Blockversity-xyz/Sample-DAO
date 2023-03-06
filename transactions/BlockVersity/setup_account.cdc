// This transaction is a template for a transaction to allow
// anyone to add a Vault resource to their account so that
// they can use the BlockVersityToken
import FungibleToken from "../../contracts/utility/FungibleToken.cdc"
import BlockVersityToken from "../../contracts/BlockVersityToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"

transaction () {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a BlockVersityToken Vault
        if signer.borrow<&BlockVersityToken.Vault>(from: BlockVersityToken.VaultStoragePath) != nil {
            return
        }

        // Create a new BlockVersityToken Vault and put it in storage
        signer.save(
            <-BlockVersityToken.createEmptyVault(),
            to: BlockVersityToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&BlockVersityToken.Vault{FungibleToken.Receiver}>(
            BlockVersityToken.ReceiverPublicPath,
            target: BlockVersityToken.VaultStoragePath
        )

        // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
        signer.link<&BlockVersityToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            BlockVersityToken.VaultPublicPath,
            target: BlockVersityToken.VaultStoragePath
        )
    }
}