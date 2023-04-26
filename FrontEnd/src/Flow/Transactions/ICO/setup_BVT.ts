export const setup_ST = () => {
  return `
import FungibleToken from 0x9a0766d93b6608b7
import SampleToken from 0x800a10d0fff7acd4
import MetadataViews from 0x631e88ae7f1d7c20

transaction () {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a SampleToken Vault
        if signer.borrow<&SampleToken.Vault>(from: SampleToken.VaultStoragePath) != nil {
            return
        }

        // Create a new SampleToken Vault and put it in storage
        signer.save(
            <-SampleToken.createEmptyVault(),
            to: SampleToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&SampleToken.Vault{FungibleToken.Receiver}>(
            SampleToken.ReceiverPublicPath,
            target: SampleToken.VaultStoragePath
        )

        // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
        signer.link<&SampleToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            SampleToken.VaultPublicPath,
            target: SampleToken.VaultStoragePath
        )
    }
}
  `
}