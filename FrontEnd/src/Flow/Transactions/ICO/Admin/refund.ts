export const refund = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614

transaction() {

    let adminRef: &GovTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: GovTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.refund()
    }
}
  `
}