export const purchaseBVT = () => {
  return `
import NonFungibleToken from 0x631e88ae7f1d7c20
import FUSD from 0xe223d8a629e49c68
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58

transaction(amount: UFix64) {

    let sentVault:  @FUSD.Vault

    let buyerAddress: Address

    prepare(account: AuthAccount) {

        let vaultRef = account.borrow<&FUSD.Vault>(from: /storage/fusdVault)
            ?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount) as! @FUSD.Vault

        self.buyerAddress = account.address

    }

    execute {
        BlockVersityTokenPublicSale.purchase(from: <-self.sentVault, address: self.buyerAddress)
    }
}
  `
}