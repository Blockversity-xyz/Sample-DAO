import SampleTokenPublicSale from "../../../../../contracts/sales/SampleTokenPublicSale.cdc"

transaction(addresses: [Address]) {

    // The reference to the Admin Resource
    let adminRef: &SampleTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        // Get admin reference
        self.adminRef = account.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        // Refund ST purchase to all addresses in the list
        for address in addresses {
            self.adminRef.refund(address: address)
        }
    }
}