import FungibleToken from "../../../../../contracts/utility/FungibleToken.cdc"
import GovToken from "../../../../../contracts/GovToken.cdc"
import GovTokenPublicSale from "../../../../../contracts/sales/GovTokenPublicSale.cdc"

// Withdraw ST by Admin and deposit it into an account.

transaction(amount: UFix64, to: Address) {

    // The reference to the Admin Resource
    let adminRef: &GovTokenPublicSale.Admin

    prepare(signer: AuthAccount) {

        // Get admin reference
        self.adminRef = signer.borrow<&GovTokenPublicSale.Admin>(from: GovTokenPublicSale.SaleAdminStoragePath)
			?? panic("Could not borrow reference to the admin!")
    }

    execute {

        // Withdraw ST from sale contract
        let vault <- self.adminRef.withdrawST(amount: amount)

        // Get the recipient's public account object
        let recipient = getAccount(to)

        // Get a reference to the recipient's Receiver
        let receiverRef = recipient.getCapability(GovToken.ReceiverPublicPath)
            .borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Deposit the withdrawn tokens in the recipient's receiver
        receiverRef.deposit(from: <- vault)
    }
}