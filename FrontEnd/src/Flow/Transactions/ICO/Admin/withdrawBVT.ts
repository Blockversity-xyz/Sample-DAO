export const withdrawBVT = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74
import GToken from 0xba85020e56e96b74
import FungibleToken from 0xc61f695fe4f80614


transaction(amount: UFix64, to: Address) {

    let adminRef: &GovTokenPublicSale.Admin

    prepare(signer: AuthAccount) {

        self.adminRef = signer.borrow<&GovTokenPublicSale.Admin>(from:  /storage/DemoGovTokenPublicSaleAdmin)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        let vault <- self.adminRef.withdrawBVT(amount: amount)

        let recipient = getAccount(to)

        let receiverRef = recipient.getCapability(/public/DemoGTokenReceiver)
            .borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")

        receiverRef.deposit(from: <- vault)
    }
}
  `
}