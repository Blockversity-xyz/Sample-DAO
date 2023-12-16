/**
 * This function exports a string containing a Cadence transaction script that distributes tokens.
 * @returns {string} Cadence transaction script
 */
export const distribute = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74

transaction() {

    let adminRef: &GovTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from:  /storage/DemoGovTokenPublicSaleAdmin)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.distribute()
    }
}
  `
}