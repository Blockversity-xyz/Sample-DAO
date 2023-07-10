export const setup_fusd = () => {
  return `
import FUSD from 0xe223d8a629e49c68
import FungibleToken from 0x9a0766d93b6608b7
import TokenExampleDAO from 0x3c407ff30723099a

transaction {

    prepare(signer: AuthAccount) {

        // It's OK if the account already has a Vault, but we don't want to replace it
        if(signer.borrow<&FUSD.Vault>(from: /storage/FUSDVault) != nil) {
            log("FUSD Vault already exists in account")
            return
        }

        // Create a new FUSD Vault and put it in storage
        signer.save(<-FUSD.createEmptyVault(), to: /storage/FUSDVault)

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
            /public/FUSDReceiver,
            target: /storage/FUSDVault
        )

        // Create a public capability to the Vault that only exposes
        // the balance field through the Balance interface
        signer.link<&FUSD.Vault{FungibleToken.Balance}>(
            /public/FUSDBalance,
            target: /storage/FUSDVault
        )
    }
}
  `
}