export const pause = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58

transaction() {

    let adminRef: &SampleTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.pause()
    }
}
  `
}