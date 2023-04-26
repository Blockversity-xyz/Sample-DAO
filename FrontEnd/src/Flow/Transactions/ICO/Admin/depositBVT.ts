export const depositST = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58
import SampleToken from 0x800a10d0fff7acd4
import FungibleToken from 0x9a0766d93b6608b7

transaction(amount: UFix64) {

    let adminRef: &SampleTokenPublicSale.Admin

    let sentVault:  @FungibleToken.Vault

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")

        let vaultRef = account.borrow<&SampleToken.Vault>(from: SampleToken.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Deposit ST
        self.adminRef.depositST(from: <-self.sentVault)
    }
}
  `
}