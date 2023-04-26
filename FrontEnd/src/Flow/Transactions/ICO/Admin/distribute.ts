export const distribute = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58

transaction(address: Address, allocationAmount: UFix64) {

    let adminRef: &SampleTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.distribute(address: address, allocationAmount: allocationAmount)
    }
}
  `
}