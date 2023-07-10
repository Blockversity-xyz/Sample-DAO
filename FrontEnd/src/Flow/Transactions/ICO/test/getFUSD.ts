export const getFUSD = () => {
    return `
  
import FUSD from 0x3c407ff30723099a

transaction {

    prepare(signer: AuthAccount) {

        // Get the reference to the FUSD Vault
        let vaultRef = signer.borrow<&FUSD.Vault>(from: /storage/FUSDVault)
            ?? panic("No FUSD Vault found in signer's account")

        // Withdraw tokens from the FUSD Vault
        let amount: UFix64 = 10.0 // Replace with the desired amount to withdraw
        let myVault <- vaultRef.withdraw(amount : amount)

        // Get the reference to your own Vault
        let myVaultRef = signer.borrow<&FUSD.Vault>(from: /storage/FUSDVault)
            ?? panic("No MyVault found in signer's account")

        // Deposit the withdrawn tokens into your own Vault
        myVaultRef.deposit(from: <-myVault)

        log("done")
    }
}

  `
}