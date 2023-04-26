import FungibleToken from "../../../../../contracts/utility/FungibleToken.cdc"
import SampleTokenMetadataViews from "../../../../../contracts/SampleTokenMetadataViews.cdc"
import SampleTokenPublicSale from "../../../../../contracts/sales/SampleTokenPublicSale.cdc"

// This is used to deposit ST tokens into the public ICO contract by the Admin

transaction(amount: UFix64) {

    // The reference to the Admin Resource
    let adminRef: &SampleTokenPublicSale.Admin

    // The FUSD Vault resource that holds the tokens that are being transferred
    let sentVault:  @FungibleToken.Vault

    prepare(account: AuthAccount) {

        // Get admin reference
        self.adminRef = account.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")

        // Get a reference to the signer's stored vault
        let vaultRef = account.borrow<&SampleTokenMetadataViews.Vault>(from: SampleTokenMetadataViews.VaultStoragePath)
			?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        // Deposit ST
        self.adminRef.depositST(from: <-self.sentVault)
    }
}