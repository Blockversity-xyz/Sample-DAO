import FungibleToken from "../utility/FungibleToken.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"
import BlockVersityTokenMetadataViews from "../BlockVersityTokenMetadataViews.cdc"
import FUSD from "../utility/FUSD.cdc"

pub contract BlockVersityTokenPublicSale {

    /****** Sale Events ******/

    pub event NewPrice(price: UFix64)
    pub event NewPersonalCap(personalCap: UFix64)

    pub event Purchased(address: Address, amount: UFix64, ticketId: UInt64)
    pub event Distributed(address: Address, tusdtAmount: UFix64, bvtAmount: UFix64)
    pub event Refunded(address: Address, amount: UFix64)

    /****** Sale Enums ******/

    pub enum PurchaseState: UInt8 {
        pub case initial
        pub case distributed
        pub case refunded
    }

    /****** Sale Resources ******/

    // BVT holder vault
    access(contract) let bvtVault: @BlockVersityTokenMetadataViews.Vault

    // FUSD holder vault
    access(contract) let fusdVault: @FUSD.Vault

    /// Paths for storing sale resources
    pub let SaleAdminStoragePath: StoragePath

    /****** Sale Variables ******/

    access(contract) var isSaleActive: Bool

    // BVT token price (FUSD per BVT)
    access(contract) var price: UFix64

    // BVT community sale purchase cap (in FUSD)
    access(contract) var personalCap: UFix64

    // All purchase records
    access(contract) var purchases: {Address: PurchaseInfo}

    // Workaround random number generator
    pub resource Random {}

    pub struct PurchaseInfo {
        // Purchaser address
        pub let address: Address

        // Purchase amount in FUSD
        pub(set) var amount: UFix64

        // Refunded amount in FUSD
        pub(set) var refundAmount: UFix64

        // Random ticked ID
        pub let ticketId: UInt64

        // State of the purchase
        pub(set) var state: PurchaseState

        init(
            address: Address,
            amount: UFix64,
        ) {
            // Create random resource
            let random <- create Random()
            let ticketId = random.uuid
            destroy random

            self.address = address
            self.amount = amount
            self.refundAmount = 0.0
            self.ticketId = ticketId % 1_073_741_824 // 2^30
            self.state = PurchaseState.initial
        }
    }

    // BVT purchase method
    // User pays FUSD and get unlocked BlockVersityToken
    pub fun purchase(from: @FUSD.Vault, address: Address) {
        pre {
            self.isSaleActive: "Token sale is not active"
            self.purchases[address] == nil: "Already purchased by the same account"
            from.balance <= self.personalCap: "Purchase amount exceeds personal cap"
        }

        let amount = from.balance
        self.fusdVault.deposit(from: <- from)

        let purchaseInfo = PurchaseInfo(address: address, amount: amount)
        self.purchases[address] = purchaseInfo

        emit Purchased(address: address, amount: amount, ticketId: purchaseInfo.ticketId)
    }

    pub fun getIsSaleActive(): Bool {
        return self.isSaleActive
    }

    // Get all purchaser addresses
    pub fun getPurchasers(): [Address] {
        return self.purchases.keys
    }

    // Get all purchase records
    pub fun getPurchases(): {Address: PurchaseInfo} {
        return self.purchases
    }

    // Get purchase record from an address
    pub fun getPurchase(address: Address): PurchaseInfo? {
        return self.purchases[address]
    }

    pub fun getBVTVaultBalance(): UFix64 {
        return self.bvtVault.balance
    }

    pub fun getFUSDVaultBalance(): UFix64 {
        return self.fusdVault.balance
    }

    pub fun getPrice(): UFix64 {
        return self.price
    }

    pub fun getPersonalCap(): UFix64 {
        return self.personalCap
    }

    pub resource Admin {
        pub fun unpause() {
            BlockVersityTokenPublicSale.isSaleActive = true
        }

        pub fun pause() {
            BlockVersityTokenPublicSale.isSaleActive = false
        }

        // Distribute BVT with an allocation amount
        // If user's purchase amount exceeds allocation amount, the remainder will be refunded
        pub fun distribute(address: Address, allocationAmount: UFix64) {
            pre {
                BlockVersityTokenPublicSale.purchases[address] != nil: "Cannot find purchase record for the address"
                BlockVersityTokenPublicSale.purchases[address]?.state == PurchaseState.initial: "Already distributed or refunded"
            }

            let receiverRef = getAccount(address).getCapability(BlockVersityTokenMetadataViews.ReceiverPublicPath)
                .borrow<&{FungibleToken.Receiver}>()
                ?? panic("Could not borrow BlockVersityToken receiver reference")

            let purchaseInfo = BlockVersityTokenPublicSale.purchases[address]
                ?? panic("Count not get purchase info for the address")

            // Make sure allocation amount does not exceed purchase amount
            assert (
                allocationAmount <= purchaseInfo.amount,
                message: "Allocation amount exceeds purchase amount"
            )

            let refundAmount = purchaseInfo.amount - allocationAmount
            let bvtAmount = allocationAmount / BlockVersityTokenPublicSale.price
            let bvtVault <- BlockVersityTokenPublicSale.bvtVault.withdraw(amount: bvtAmount)

            // Set the state of the purchase to DISTRIBUTED
            purchaseInfo.state = PurchaseState.distributed
            purchaseInfo.amount = allocationAmount
            purchaseInfo.refundAmount = refundAmount
            BlockVersityTokenPublicSale.purchases[address] = purchaseInfo

            // Deposit the withdrawn tokens in the recipient's receiver
            receiverRef.deposit(from: <- bvtVault)

            emit Distributed(address: address, tusdtAmount: allocationAmount, bvtAmount: bvtAmount)

            // Refund the remaining amount
            if refundAmount > 0.0 {
                let FUSDReceiverRef = getAccount(address).getCapability(/public/fusdReceiver)
                    .borrow<&{FungibleToken.Receiver}>()
                    ?? panic("Could not borrow FUSD vault receiver public reference")

                let fusdVault <- BlockVersityTokenPublicSale.fusdVault.withdraw(amount: refundAmount)

                FUSDReceiverRef.deposit(from: <- fusdVault)

                emit Refunded(address: address, amount: refundAmount)
            }
        }

        pub fun refund(address: Address) {
            pre {
                BlockVersityTokenPublicSale.purchases[address] != nil: "Cannot find purchase record for the address"
                BlockVersityTokenPublicSale.purchases[address]?.state == PurchaseState.initial: "Already distributed or refunded"
            }

            let receiverRef = getAccount(address).getCapability(/public/fusdReceiver)
                .borrow<&{FungibleToken.Receiver}>()
                ?? panic("Could not borrow FUSD vault receiver public reference")

            let purchaseInfo = BlockVersityTokenPublicSale.purchases[address]
                ?? panic("Count not get purchase info for the address")

            let fusdVault <- BlockVersityTokenPublicSale.fusdVault.withdraw(amount: purchaseInfo.amount)

            // Set the state of the purchase to REFUNDED
            purchaseInfo.state = PurchaseState.refunded
            BlockVersityTokenPublicSale.purchases[address] = purchaseInfo

            receiverRef.deposit(from: <- fusdVault)

            emit Refunded(address: address, amount: purchaseInfo.amount)
        }

        pub fun updatePrice(price: UFix64) {
            pre {
                price > 0.0: "Sale price cannot be 0"
            }

            BlockVersityTokenPublicSale.price = price
            emit NewPrice(price: price)
        }

        pub fun updatePersonalCap(personalCap: UFix64) {
            BlockVersityTokenPublicSale.personalCap = personalCap
            emit NewPersonalCap(personalCap: personalCap)
        }

        pub fun withdrawBVT(amount: UFix64): @FungibleToken.Vault {
            return <- BlockVersityTokenPublicSale.bvtVault.withdraw(amount: amount)
        }

        pub fun withdrawFUSD(amount: UFix64): @FungibleToken.Vault {
            return <- BlockVersityTokenPublicSale.fusdVault.withdraw(amount: amount)
        }

        pub fun depositBVT(from: @FungibleToken.Vault) {
            BlockVersityTokenPublicSale.bvtVault.deposit(from: <- from)
        }

        pub fun depositFUSD(from: @FungibleToken.Vault) {
            BlockVersityTokenPublicSale.fusdVault.deposit(from: <- from)
        }
    }

    init() {
        // Needs Admin to start manually
        self.isSaleActive = false

        // 1 BVT = 1 FUSD
        self.price = 1.0

        // Each user can purchase at most 500 FUSD worth of BvT
        self.personalCap = 500.0

        self.purchases = {}
        self.SaleAdminStoragePath = /storage/blockVersityTokenPublicSaleAdmin

        self.bvtVault <- BlockVersityTokenMetadataViews.createEmptyVault()
        self.fusdVault <- FUSD.createEmptyVault()
        let admin <- create Admin()
        self.account.save(<- admin, to: self.SaleAdminStoragePath)
    }
}
