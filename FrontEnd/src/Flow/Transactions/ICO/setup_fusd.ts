export const setup_fusd = () => {
  return `
import FUSD from 0xc61f695fe4f80614
import FungibleToken from 0xc61f695fe4f80614
import TokenExampleDAO from 0xc61f695fe4f80614

transaction {

    prepare(signer: AuthAccount) {

        // It's OK if the account already has a Vault, but we don't want to replace it
        if(signer.borrow<&FUSD.Vault>(from: /storage/testVault) != nil) {
            log("FUSD Vault already exists in account")
            return
        }

        // Create a new FUSD Vault and put it in storage
        signer.save(<-FUSD.createEmptyVault(), to: /storage/testVault)

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
            /public/testReceiver,
            target: /storage/testVault
        )

        // Create a public capability to the Vault that only exposes
        // the balance field through the Balance interface
        signer.link<&FUSD.Vault{FungibleToken.Balance}>(
            /public/testBalance,
            target: /storage/testVault
        )
    }
}
  `
}