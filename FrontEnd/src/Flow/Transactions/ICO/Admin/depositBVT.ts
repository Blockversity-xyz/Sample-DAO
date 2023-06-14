export const depositBVT = () => {
  return `
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58
import BlockVersityToken from 0x800a10d0fff7acd4
import FungibleToken from 0x9a0766d93b6608b7

transaction(amount: UFix64) {

    let adminRef: &BlockVersityTokenPublicSale.Admin

    let sentVault:  @FungibleToken.Vault

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&BlockVersityTokenPublicSale.Admin>(from: BlockVersityTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")

        let vaultRef = account.borrow<&BlockVersityToken.Vault>(from: BlockVersityToken.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Deposit BVT
        self.adminRef.depositBVT(from: <-self.sentVault)
    }
}
  `
}