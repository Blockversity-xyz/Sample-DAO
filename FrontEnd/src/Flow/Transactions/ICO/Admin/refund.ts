
/**
 * This function exports a string containing a Cadence transaction script for refunding tokens in a GovTokenPublicSale contract.
 * @returns A string containing the Cadence transaction script for refunding tokens.
 */
export const refund = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74

transaction() {

    let adminRef: &GovTokenPublicSale.Admin

    prepare(account: AuthAccount) {

        self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: /storage/DemoGovTokenPublicSaleAdmin)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        self.adminRef.refund()
    }
}
  `
}