export const distribute = () => {
  return `
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58

transaction(address: Address, allocationAmount: UFix64) {

    let adminRef: &BlockVersityTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&BlockVersityTokenPublicSale.Admin>(from: BlockVersityTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.distribute(address: address, allocationAmount: allocationAmount)
    }
}
  `
}