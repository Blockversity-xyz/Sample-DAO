import FungibleToken from "../../../../../contracts/utility/FungibleToken.cdc"
import FUSD from "../../../../../contracts/utility/FUSD.cdc"
import SampleTokenPublicSale from "../../../../../contracts/sales/SampleTokenPublicSale.cdc"

transaction(amount: UFix64, to: Address) {

    // The reference to the Admin Resource
    let adminRef: &SampleTokenPublicSale.Admin

    prepare(signer: AuthAccount) {

        // Get admin reference
        self.adminRef = signer.borrow<&SampleTokenPublicSale.Admin>(from: SampleTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        // Withdraw FUSD from sale contract
        let vault <- self.adminRef.withdrawFUSD(amount: amount)

        // Get the recipient's public account object
        let recipient = getAccount(to)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.getCapability(/public/fusdReceiver)
            .borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <- vault)
    }
}
