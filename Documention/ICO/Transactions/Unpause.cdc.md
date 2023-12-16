# Documentation for the `unpause` Transaction

This transaction is part of the `GovTokenPublicSale` contract and is used to unpause the token sale.

## Import

```javascript
import GovTokenPublicSale from 0xba85020e56e96b74
```

## Transaction

```javascript
transaction() {
 let adminRef: &GovTokenPublicSale.Admin

 prepare(account: AuthAccount) {
    self.adminRef = account.borrow<&GovTokenPublicSale.Admin>(from: /storage/DemoGovTokenPublicSaleAdmin)
        ?? panic("Could not borrow reference to the admin!")
 }

 execute {
    self.adminRef.unpause()
 }
}
```

## Description

The `unpause` transaction is a part of the `GovTokenPublicSale` contract. It is used to unpause the token sale.

### Parameters

This transaction does not take any parameters.

### Preparation

In the `prepare` phase, the transaction borrows a reference to the `Admin` resource from the account's storage. If the reference cannot be borrowed, the transaction panics with the message "Could not borrow reference to the admin!".

### Execution

In the `execute` phase, the `unpause` method of the `Admin` resource is called. This method is responsible for unpausing the token sale.

## Usage

This transaction can be called by any account that has the `Admin` resource stored in its storage. The account must have the necessary permissions to call the `unpause` method of the `Admin` resource.

## Errors

If the transaction fails to borrow a reference to the `Admin` resource, it will panic with the message "Could not borrow reference to the admin!".