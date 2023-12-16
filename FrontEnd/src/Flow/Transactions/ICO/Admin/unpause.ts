
/**
 * This function returns a string containing a Cadence transaction script to unpause the ICO admin.
 * @returns {string} Cadence transaction script to unpause the ICO admin.
 */
export const unPause = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74

transaction() {

    let adminRef: &GovTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: /storage/DemoGovTokenPublicSaleAdmin)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.unpause()
    }
}
  `
}