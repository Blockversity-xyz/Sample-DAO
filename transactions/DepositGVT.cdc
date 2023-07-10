import GTokenPublicSale from 0x3c407ff30723099a
import GovToken from 0x3c407ff30723099a
import FungibleToken from 0x9a0766d93b6608b7

transaction(amount: UFix64) {

    let adminRef: &GTokenPublicSale.Admin

    let sentVault:  @FungibleToken.Vault

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GTokenPublicSale.Admin>(from: GTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")

        let vaultRef = account.borrow<&GovToken.Vault>(from: GovToken.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Deposit BVT
        self.adminRef.depositGVT(from: <-self.sentVault)
    }
}