export const withdrawST = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58
import SampleToken from 0x800a10d0fff7acd4
import FungibleToken from 0x9a0766d93b6608b7


transaction(amount: UFix64, to: Address) {

    let adminRef: &SampleTokenPublicSale.Admin

    prepare(signer: AuthAccount) {

        self.adminRef = signer.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        let vault <- self.adminRef.withdrawST(amount: amount)

        let recipient = getAccount(to)

        let receiverRef = recipient.getCapability(SampleToken.ReceiverPublicPath)
            .borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")

        receiverRef.deposit(from: <- vault)
    }
}
  `
}