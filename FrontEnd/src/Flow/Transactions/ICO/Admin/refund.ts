export const refund = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a

transaction(address: Address, allocationAmount: UFix64) {

    let adminRef: &GTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GTokenPublicSale.Admin>(from: GTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.distribute(address: address, allocationAmount: allocationAmount)
    }
}
  `
}