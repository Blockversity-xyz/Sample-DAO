export const withdrawBVT = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a
import GovToken from 0x3c407ff30723099a
import FungibleToken from 0x9a0766d93b6608b7


transaction(amount: UFix64, to: Address) {

    let adminRef: &GTokenPublicSale.Admin

    prepare(signer: AuthAccount) {

        self.adminRef = signer.borrow<&GTokenPublicSale.Admin>(from: GTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        let vault <- self.adminRef.withdrawBVT(amount: amount)

        let recipient = getAccount(to)

        let receiverRef = recipient.getCapability(GovToken.ReceiverPublicPath)
            .borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")

        receiverRef.deposit(from: <- vault)
    }
}
  `
}