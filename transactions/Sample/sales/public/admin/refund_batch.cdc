import GovTokenPublicSale from "../../../../../contracts/sales/GovTokenPublicSale.cdc"

transaction(addresses: [Address]) {

    // The reference to the Admin Resource
    let adminRef: &GovTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        // Get admin reference
        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: GovTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        // Refund ST purchase to all addresses in the list
        for address in addresses {
            self.adminRef.refund(address: address)
        }
    }
}