export const purchaseBVT = () => {
  return `
import FungibleToken from 0xc61f695fe4f80614
import FiatToken from 0xa4f61a30f7716c6f
import GovTokenPublicSale from 0xba85020e56e96b74

transaction(amount: UFix64) {

    let sentVault:  @FiatToken.Vault

    let buyerAddress: Address

    prepare(account: AuthAccount) {

        let vaultRef = account.borrow<&FiatToken.Vault>(from: /storage/FVaultStoragePath)
            ?? panic("Could not borrow reference to the owner's Vault!")

            log(vaultRef.balance)

            if vaultRef.balance < amount {
    panic("Insufficient balance in the vault")
}

        self.sentVault <- vaultRef.withdraw(amount: amount) as! @FiatToken.Vault

        self.buyerAddress = account.address

    }

    execute {
        GovTokenPublicSale.purchase(from: <-self.sentVault, address: self.buyerAddress)
    }
}
  `
}