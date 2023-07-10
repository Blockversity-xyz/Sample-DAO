
import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68

// This transaction is a template for a transaction that
// could be used by anyone to send FUSD tokens to another account
// that owns a Vault
transaction {

  // Temporary Vault object that holds the balance that is being transferred
  var temporaryVault: @FungibleToken.Vault

  prepare(acct: AuthAccount) {
    // Withdraw tokens from your vault by borrowing a reference to it
    // and calling the withdraw function with that reference
    let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/FUSDVault)
        ?? panic("Could not borrow a reference to the owner's vault")
      
    self.temporaryVault <- vaultRef.withdraw(amount: 1000.0)
  }

  execute {
    // Get the recipient's public account object
    let recipient = getAccount(0x79e61d7855d74a97)

    // Get the recipient's Receiver reference to their Vault
    // by borrowing the reference from the public capability
    let receiverRef = recipient.getCapability(/public/FUSDReceiver)
                      .borrow<&FUSD.Vault{FungibleToken.Receiver}>()
                      ?? panic("Could not borrow a reference to the receiver")

    // Deposit your tokens to their Vault
    receiverRef.deposit(from: <-self.temporaryVault)

    log("Transfer succeeded!")
  }
}
