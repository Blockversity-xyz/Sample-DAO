# Documentation for the `purchase` Transaction

This transaction is part of the `GovTokenPublicSale` contract and is used to purchase tokens using fiat tokens.

## Import

```javascript
import FungibleToken from 0xc61f695fe4f80614
import FiatToken from 0xa4f61a30f7716c6f
import GovTokenPublicSale from 0xba85020e56e96b74
```

## Transaction

```javascript
transaction(amount: UFix64) {
 let sentVault: @FiatToken.Vault

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
```

## Description

The `purchase` transaction is a part of the `GovTokenPublicSale` contract. It is used to purchase tokens using fiat tokens.

### Parameters

- `amount`: The amount of fiat tokens to use for the purchase.

### Preparation

In the `prepare` phase, the transaction borrows a reference to the `FiatToken.Vault` resource from the account's storage. If the reference cannot be borrowed, the transaction panics with the message "Could not borrow reference to the owner's Vault!". The transaction then checks if the balance of the vault is less than the amount to be used for the purchase. If it is, the transaction panics with the message "Insufficient balance in the vault". Finally, the transaction withdraws the specified amount of fiat tokens from the vault and stores the address of the account.

### Execution

In the `execute` phase, the `purchase` method of the `GovTokenPublicSale` contract is called to purchase tokens using the withdrawn fiat tokens.

## Usage

This transaction can be called by any account that has the `FiatToken.Vault` resource stored in its storage. The account must have the necessary permissions to withdraw tokens from the vault and to call the `purchase` method of the `GovTokenPublicSale` contract.

## Errors

If the transaction fails to borrow a reference to the `FiatToken.Vault` resource or if the balance of the vault is insufficient, it will panic with the appropriate error message.