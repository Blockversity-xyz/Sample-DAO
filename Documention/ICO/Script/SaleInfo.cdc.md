# Documentation for the `Info` Struct and `main` Function

This code is part of the `GovTokenPublicSale` contract and is used to retrieve and return information about the token sale.

## Struct

```javascript
pub struct Info {
 pub let tokenName: String
 pub let tokenSymbol: String
 pub let Lockup: UFix64
 pub let tokenSupply: UFix64
 pub let tokenPrice: UFix64
 pub let saleStart: UFix64
 pub let saleEnd: UFix64
 pub let minimumGoal: UFix64
 pub let purchasers: [Address]

   init(
       tokenName: String,
       tokenSymbol: String,
       lockup: UFix64,
       tokenSupply: UFix64,
       tokenPrice: UFix64,
       saleStart: UFix64,
       saleEnd: UFix64,
       minimumGoal: UFix64,
       purchasers: [Address]
   ) {
       self.tokenName = tokenName
       self.tokenSymbol = tokenSymbol
       self.Lockup = lockup
       self.tokenSupply = tokenSupply
       self.tokenPrice = tokenPrice
       self.saleStart = saleStart
       self.saleEnd = saleEnd
       self.minimumGoal = minimumGoal
       self.purchasers = purchasers
   }
}
```

### Description

The `Info` struct is used to store information about the token sale. It has the following fields:

- `tokenName`: The name of the token.
- `tokenSymbol`: The symbol of the token.
- `Lockup`: The lockup period for the token.
- `tokenSupply`: The total supply of the token.
- `tokenPrice`: The price of the token.
- `saleStart`: The start time of the token sale.
- `saleEnd`: The end time of the token sale.
- `minimumGoal`: The minimum goal for the token sale.
- `purchasers`: An array of addresses of the purchasers.

### Initialization

The `init` function is used to initialize an instance of the `Info` struct. It takes the same parameters as the fields of the struct and assigns them to the fields of the struct.

## Function

```javascript
pub fun main(): Info {

 return Info(
   tokenName: GovTokenPublicSale.tokenName,
   tokenSymbol: GovTokenPublicSale.tokenSymbol,
   lockup: GovTokenPublicSale.lockup,
   tokenSupply: GovTokenPublicSale.tokenSupply,
   tokenPrice: GovTokenPublicSale.tokenPrice,
   saleStart: GovTokenPublicSale.saleStart,
   saleEnd: GovTokenPublicSale.saleEnd,
   minimumGoal:GovTokenPublicSale.minimumGoal,
   purchasers: GovTokenPublicSale.getPurchasers()
 )
}
```

### Description

The `main` function is used to retrieve information about the token sale and return it as an instance of the `Info` struct. It calls the `getPurchasers` method of the `GovTokenPublicSale` contract to get the addresses of the purchasers.

### Return Value

The `main` function returns an instance of the `Info` struct with the following fields:

- `tokenName`: The name of the token.
- `tokenSymbol`: The symbol of the token.
- `Lockup`: The lockup period for the token.
- `tokenSupply`: The total supply of the token.
- `tokenPrice`: The price of the token.
- `saleStart`: The start time of the token sale.
- `saleEnd`: The end time of the token sale.
- `minimumGoal`: The minimum goal for the token sale.
- `purchasers`: An array of addresses of the purchasers.