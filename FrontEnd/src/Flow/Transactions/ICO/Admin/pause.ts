export const pause = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a

transaction() {

    let adminRef: &GTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GTokenPublicSale.Admin>(from: GTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.pause()
    }
}
  `
}