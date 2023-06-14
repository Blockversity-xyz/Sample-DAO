export const setup_BVT = () => {
  return `
import FungibleToken from 0x9a0766d93b6608b7
import BlockVersityToken from 0x800a10d0fff7acd4
import MetadataViews from 0x631e88ae7f1d7c20

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
  `
}