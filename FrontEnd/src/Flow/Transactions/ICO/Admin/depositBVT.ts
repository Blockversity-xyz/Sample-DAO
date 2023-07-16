export const depositBVT = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614
import GToken from 0xc61f695fe4f80614
import FungibleToken from 0xc61f695fe4f80614

transaction(amount: UFix64) {

    let adminRef: &GovTokenPublicSale.Admin

    let sentVault:  @FungibleToken.Vault

    prepare(account: AuthAccount) {

        let provider = getAccount(0xc61f695fe4f80614)

        let providerVaultRef = provider
            .getCapability(GToken.VaultPublicPath)
            .borrow<&GToken.Vault{FungibleToken.Provider}>()
            ?? panic("Could not borrow reference to the provider's Vault")

        // Withdraw tokens from provider's vault

        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: GovTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the Sale admin!")

        let vaultRef = account.borrow<&GToken.Vault>(from: GToken.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- providerVaultRef.withdraw(amount: amount)
        
    }

        execute {

        // Deposit GVT
        self.adminRef.depositGVT(from: <-self.sentVault)
    }
}

  `
}