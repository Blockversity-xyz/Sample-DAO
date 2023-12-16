# Documentation for the `withdrawFiatToken` Transaction

This transaction is part of the `GovTokenPublicSale` contract and is used to withdraw fiat tokens from the admin's account.

## Import

```javascript
import GovTokenPublicSale from 0xba85020e56e96b74
import GToken from 0xba85020e56e96b74
import FungibleToken from 0xc61f695fe4f80614
```

## Transaction

```javascript
transaction(amount: UFix64, to: Address) {
 let adminRef: &GovTokenPublicSale.Admin

 prepare(signer: AuthAccount) {
   self.adminRef = signer.borrow<&GovTokenPublicSale.Admin>(from: /storage/DemoGovTokenPublicSaleAdmin)
       ?? panic("Could not borrow reference to the admin!")
 }

 execute {
   let vault <- self.adminRef.withdrawFiatToken(amount: amount)

   let recipient = getAccount(to)

   let receiverRef = recipient.getCapability(/public/DemoGTokenReceiver)
       .borrow<&{FungibleToken.Receiver}>()
       ?? panic("Could not borrow receiver reference to the recipient's Vault")

   receiverRef.deposit(from: <- vault)
 }
}
```

## Description

The `withdrawFiatToken` transaction is a part of the `GovTokenPublicSale` contract. It is used to withdraw fiat tokens from the admin's account and deposit them into the recipient's vault.

### Parameters

- `amount`: The amount of fiat tokens to withdraw.
- `to`: The address of the recipient.

### Preparation

In the `prepare` phase, the transaction borrows a reference to the `Admin` resource from the signer's storage. If the reference cannot be borrowed, the transaction panics with the message "Could not borrow reference to the admin!".

### Execution

In the `execute` phase, the `withdrawFiatToken` method of the `Admin` resource is called to withdraw the specified amount of fiat tokens. Then, the transaction borrows a reference to the recipient's vault. If the reference cannot be borrowed, the transaction panics with the message "Could not borrow receiver reference to the recipient's Vault". Finally, the `deposit` method of the recipient's vault is called to deposit the withdrawn tokens.

## Usage

This transaction can be called by any account that has the `Admin` resource stored in its storage. The account must have the necessary permissions to call the `withdrawFiatToken` method of the `Admin` resource and to deposit tokens into the recipient's vault.

## Errors

If the transaction fails to borrow a reference to the `Admin` resource or the recipient's vault, it will panic with the appropriate error message.