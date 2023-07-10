export const purchaseBVT = () => {
  return `
import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68
import GTokenPublicSale from 0x3c407ff30723099a

transaction(amount: UFix64) {

    let sentVault:  @FUSD.Vault

    let buyerAddress: Address

    prepare(account: AuthAccount) {

        let vaultRef = account.borrow<&FUSD.Vault>(from: /storage/FUSDVault2)
            ?? panic("Could not borrow reference to the owner's Vault!")

            log(vaultRef.balance)
            
            if vaultRef.balance < amount {
    panic("Insufficient balance in the vault")
}

        self.sentVault <- vaultRef.withdraw(amount: amount) as! @FUSD.Vault

        self.buyerAddress = account.address

    }

    execute {
        GTokenPublicSale.purchase(from: <-self.sentVault, address: self.buyerAddress)
    }
}
  `
}