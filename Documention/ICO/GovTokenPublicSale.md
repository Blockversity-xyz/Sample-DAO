
1. **Imports**: The contract imports several modules: `FungibleToken`, `NonFungibleToken`, `GToken`, and `FiatToken` from various addresses. These modules provide generic functionality for fungible and non-fungible tokens.

2. **Contract Variables**: The contract defines several variables like `tokenSupply`, `tokenName`, `tokenSymbol`, `totalIssued`, `tokenPrice`, `saleStart`, `saleEnd`, `minimumGoal`, `isSaleActive`, `isLaunched`, `lockup`, `maxCap`, and `minCap`. These variables are used to set the details of the ICO. Additionally, it has a dictionary `purchases` to store all purchase records.

3. **Events**: The contract declares several events like `Purchased`, `Distributed`, and `Refunded` to notify about various activities in the contract.

4. **Enums**: The contract uses an enum `PurchaseState` to track the state of a purchase.

5. **Resources**: The contract defines several resources like `Vault`, `Random`, `PurchaseInfo`, and `Admin`. The `Vault` resources are used to hold the tokens of the GToken and FiatToken. The `Random` resource is used to generate random numbers. The `PurchaseInfo` struct is used to store the purchase information of a buyer. The `Admin` resource provides administrative functions for the contract.

6. **Purchasing Tokens**: The `purchase` function allows a user to purchase tokens by paying in FiatToken. The purchase information is stored in the `purchases` dictionary and a `Purchased` event is emitted.

7. **Distributing Tokens**: The `distribute` function distributes the purchased tokens to all the buyers if the ICO reaches its minimum goal. It updates the state of the purchase to `distributed` and emits a `Distributed` event.

8. **Refunding**: The `refund` function refunds the FiatToken to all the buyers if the ICO does not reach its minimum goal. It updates the state of the purchase to `refunded` and emits a `Refunded` event.

9. **Admin Functions**: The Admin resource provides several administrative functions like setting the token details, starting and ending the sale, withdrawing FiatToken, and depositing GVT.

10. **Initialization**: The `init` function initializes the contract variables, creates empty vaults for GToken and FiatToken, and saves the Admin resource in storage.

This contract provides a complete ICO token sale mechanism, including purchase, distribution, and refund. It also provides administrative functions to control the sale process. The use of resources and capabilities in the contract ensures the safety and security of the tokens

**Code breakdown**

1. **Imports**: The contract imports several modules: `FungibleToken`, `NonFungibleToken`, `GToken`, and `FiatToken` from various addresses. These modules provide generic functionality for fungible and non-fungible tokens.

```cadence
import FungibleToken from 0xc61f695fe4f80614
import NonFungibleToken from 0xc61f695fe4f80614
import GToken from 0xba85020e56e96b74
import FiatToken from 0xa4f61a30f7716c6f
```

2. **Contract Variables**: The contract defines several variables like `tokenSupply`, `tokenName`, `tokenSymbol`, `totalIssued`, `tokenPrice`, `saleStart`, `saleEnd`, `minimumGoal`, `isSaleActive`, `isLaunched`, `lockup`, `maxCap`, and `minCap`. These variables are used to set the details of the ICO. Additionally, it has a dictionary `purchases` to store all purchase records.

```cadence
pub let tokenSupply: UFix64
pub var tokenName: String
pub var tokenSymbol: String
pub var totalIssued: UFix64 
pub var tokenPrice: UFix64
pub var saleStart: UFix64
pub var saleEnd: UFix64
pub var minimumGoal: UFix64
pub var isSaleActive: Bool
pub var isLaunched: Bool
pub var lockup : UFix64
access(contract) var maxCap: UFix64
access(contract) var minCap: UFix64
access(contract) var purchases: {Address: PurchaseInfo}
```

3. **Events**: The contract declares several events like `Purchased`, `Distributed`, and `Refunded` to notify about various activities in the contract.

```cadence
pub event Purchased(address: Address, amount: UFix64, ticketId: UInt64)
pub event Distributed(address: Address, gvtAmount: UFix64)
pub event Refunded(address: Address, amount: UFix64)
```

4. **Enums**: The contract uses an enum `PurchaseState` to track the state of a purchase.

```cadence
pub enum PurchaseState: UInt8 {
    pub case initial
    pub case distributed
    pub case refunded
}
```

5. **Resources**: The contract defines several resources like `Vault`, `Random`, `PurchaseInfo`, and `Admin`. The `Vault` resources are used to hold the tokens of the GToken and FiatToken. The `Random` resource is used to generate random numbers. The `PurchaseInfo` struct is used to store the purchase information of a buyer. The `Admin` resource provides administrative functions for the contract.

```cadence
pub resource Random {}
pub struct PurchaseInfo {...}
pub resource Admin {...}
```

6. **Purchasing Tokens**: The `purchase` function allows a user to purchase tokens by paying in FiatToken. The purchase information is stored in the `purchases` dictionary and a `Purchased` event is emitted.

```cadence
pub fun purchase(from: @FiatToken.Vault, address: Address) {...}
```

7. **Distributing Tokens**: The `distribute` function distributes the purchased tokens to all the buyers if the ICO reaches its minimum goal. It updates the state of the purchase to `distributed` and emits a `Distributed` event.

```cadence
pub fun distribute() {...}
```

8. **Refunding**: The `refund` function refunds the FiatToken to all the buyers if the ICO does not reach its minimum goal. It updates the state of the purchase to `refunded` and emits a `Refunded` event.

```cadence
pub fun refund() {...}
```

9. **Admin Functions**: The Admin resource provides several administrative functions like setting the token details, starting and ending the sale, withdrawing FiatToken, and depositing GVT.

```cadence
pub resource Admin {
    pub fun setLockup(lockup: UFix64) {...}
    pub fun setTokenName(name: String, addr: Address) {...}
    pub fun setTokenSymbol(symbol: String, addr: Address) {...}
    pub fun setTokenPrice(price: UFix64, addr: Address) {...}
    pub fun setSaleStart(start: UFix64, addr: Address) {...}
    pub fun setSaleEnd(end: UFix64, addr: Address) {...}
    pub fun setMinimumGoal(goal: UFix64, addr: Address) {...}
    pub fun isLauched() {...}
    pub fun unpause() {...}
    pub fun pause() {...}
    pub fun withdrawFiatToken(amount: UFix64): @FungibleToken
```


