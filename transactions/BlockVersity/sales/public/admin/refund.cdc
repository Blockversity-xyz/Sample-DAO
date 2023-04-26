import BlockVersityTokenPublicSale from "../../../../../contracts/sales/BlockVersityTokenPublicSale.cdc"

transaction(address: Address) {

    // The reference to the Admin Resource
    let adminRef: &BlockVersityTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        // Get admin reference
        self.adminRef = account.borrow<&BlockVersityTokenPublicSale.Admin>(from: BlockVersityTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        // Refun BVT purchase
        self.adminRef.refund(address: address)
    }
}
