export const setup_BVT = () => {
  return `
import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import GovToken from 0x3c407ff30723099a
import MetadataViews from 0x631e88ae7f1d7c20

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
  `
}