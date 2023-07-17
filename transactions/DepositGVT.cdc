import GTokenPublicSale from 0xc61f695fe4f80614
import GToken from 0xc61f695fe4f80614
import FungibleToken from 0xc61f695fe4f80614

transaction(amount: UFix64) {

    let adminRef: &GTokenPublicSale.Admin

    let sentVault:  @FungibleToken.Vault

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GTokenPublicSale.Admin>(from: GTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")

        let vaultRef = account.borrow<&GToken.Vault>(from: GToken.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Deposit BVT
        self.adminRef.depositGVT(from: <-self.sentVault)
    }
}