import GovTokenPublicSale from "../../../../../contracts/sales/GovTokenPublicSale.cdc"

transaction(address: Address, allocationAmount: UFix64) {

    // The reference to the Admin Resource
    let adminRef: &GovTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        // Get admin reference
        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: GovTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        // Distribute ST purchase
        self.adminRef.distribute(address: address, allocationAmount: allocationAmount)
    }
}