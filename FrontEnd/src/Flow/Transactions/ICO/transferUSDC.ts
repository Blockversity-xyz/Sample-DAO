export const transfer_USDC = () => {
    return `

    import FungibleToken from 0xc61f695fe4f80614
    import FiatToken from 0xa4f61a30f7716c6f
    import OnChainMultiSig from 0xc61f695fe4f80614
    
    // This transaction is a template for a transaction that
    // could be used by anyone to send usdc tokens to another account
    // that owns a Vault
    transaction {
    
      // Temporary Vault object that holds the balance that is being transferred
      var temporaryVault: @FungibleToken.Vault
    
      prepare(acct: AuthAccount) {
        // Withdraw tokens from your vault by borrowing a reference to it
        // and calling the withdraw function with that reference
        let vaultRef = acct.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
            ?? panic("Could not borrow a reference to the owner's vault")
          
        self.temporaryVault <- vaultRef.withdraw(amount: 10000.0)
      }
    
      execute {
        // Get the recipient's public account object
        let recipient = getAccount(0xa3fdc3be70c7da3a)

        // Get the recipient's Receiver reference to their Vault
        // This is the interface that lets them receive tokens sent to them
        // by borrowing the reference from the public capability
        let receiverRef = recipient.getCapability(FiatToken.VaultReceiverPubPath)
                          .borrow<&FiatToken.Vault{FungibleToken.Receiver}>()
                          ?? panic("Could not borrow a reference to the receiver vault")

        // Deposit your tokens to their Vault
        receiverRef.deposit(from: <-self.temporaryVault)

        log("Transfer succeeded!")
      }
    }

    `;
  };