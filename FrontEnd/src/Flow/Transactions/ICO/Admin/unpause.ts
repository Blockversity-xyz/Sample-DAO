export const unPause = () => {
  return `
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58

transaction() {

    let adminRef: &BlockVersityTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&BlockVersityTokenPublicSale.Admin>(from: BlockVersityTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.unpause()
    }
}
  `
}