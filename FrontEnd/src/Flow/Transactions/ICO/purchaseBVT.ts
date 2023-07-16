export const purchaseBVT = () => {
  return `
import FungibleToken from 0xc61f695fe4f80614
import FUSD from 0xc61f695fe4f80614
import GovTokenPublicSale from 0xc61f695fe4f80614

transaction(amount: UFix64) {

    let sentVault:  @FUSD.Vault

    let buyerAddress: Address

    prepare(account: AuthAccount) {

        let vaultRef = account.borrow<&FUSD.Vault>(from: /storage/FUSDVault)
            ?? panic("Could not borrow reference to the owner's Vault!")

            log(vaultRef.balance)

            if vaultRef.balance < amount {
    panic("Insufficient balance in the vault")
}

        self.sentVault <- vaultRef.withdraw(amount: amount) as! @FUSD.Vault

        self.buyerAddress = account.address

    }

    execute {
        GovTokenPublicSale.purchase(from: <-self.sentVault, address: self.buyerAddress)
    }
}
  `
}