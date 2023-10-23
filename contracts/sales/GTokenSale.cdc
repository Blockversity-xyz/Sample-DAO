import FungibleToken from 0xc61f695fe4f80614
import NonFungibleToken from 0xc61f695fe4f80614
import GovToken from 0xc61f695fe4f80614
import FiatToken from 0xa4f61a30f7716c6f


pub contract GTokenPublicSale {

  /****** Contract Variables ******/

  // Define the ICO Token and Sale Details
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
  // GVT community sale purchase cap (in FUSD)
  access(contract) var maxCap: UFix64
  // Minimum amount to buy  (in FUSD)
  access(contract) var minCap: UFix64
  // All purchase records
  access(contract) var purchases: {Address: PurchaseInfo}

  /****** Sale Events ******/

  pub event Purchased(address: Address, amount: UFix64, ticketId: UInt64)
  pub event Distributed(address: Address, gvtAmount: UFix64)
  pub event Refunded(address: Address, amount: UFix64)

  /****** Sale Enums ******/

  pub enum PurchaseState: UInt8 {
      pub case initial
      pub case distributed
      pub case refunded
  }

  /****** Sale Resources ******/

  /// Paths for storing sale resources
  pub let SaleAdminStoragePath: StoragePath

  // gVT holder vault
  access(contract) let gvtVault: @GovToken.Vault

  // FUSD holder vault
  access(contract) let fusdVault: @FUSD.Vault

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

  /****** Admin Resource ******/
        pub fun claimAdmin(): @GTokenPublicSale.Admin {
        return <- create Admin()
    }
  pub resource Admin {
      pub fun setLockup(lockup: UFix64) {
          GTokenPublicSale.lockup = lockup
      }
      
      pub fun setTokenName(name: String) {
          GTokenPublicSale.tokenName = name
      }
      pub fun setTokenSymbol(symbol: String) {
          GTokenPublicSale.tokenSymbol = symbol
      }
      pub fun setTokenPrice(price: UFix64) {
          GTokenPublicSale.tokenPrice = price
      }
      pub fun setSaleStart(start: UFix64) {
          GTokenPublicSale.saleStart = start
      }
      pub fun setSaleEnd(end: UFix64) {
          GTokenPublicSale.saleEnd = end
      }
      pub fun setMinimumGoal(goal: UFix64) {
          GTokenPublicSale.minimumGoal = goal
      }
        pub fun setMaxCap(cap: UFix64) {
            GTokenPublicSale.maxCap = cap
        }
        pub fun setMinCap(cap: UFix64) {
            GTokenPublicSale.minCap = cap
        }
        

      pub fun isLauched() {
          GTokenPublicSale.isLaunched = true
      }

            pub fun unpause() {
            GTokenPublicSale.isSaleActive = true
        }

        pub fun pause() {
            GTokenPublicSale.isSaleActive = false
        }

      pub fun withdrawFUSD(amount: UFix64): @FungibleToken.Vault {
        pre {
          // Avoid withdrawing funds before the sale ends, in case it needs refunding
          GTokenPublicSale.saleHasEnded() == false: "Token sale hasn't ended"
        }
        return <- GTokenPublicSale.fusdVault.withdraw(amount: amount)
      }

      pub fun depositGVT(from: @FungibleToken.Vault) {
          GTokenPublicSale.gvtVault.deposit(from: <- from)
      }
    }

  // GVT purchase method
  // User pays FUSD and get unlocked SampleToken
  pub fun purchase(from: @FUSD.Vault, address: Address) {
      pre {
          self.saleHasEnded() : "Token sale has ended"
          !self.isSaleActive : "Token sale is not active"

      }

      let amount = from.balance
      self.fusdVault.deposit(from: <- from)

      // Divide the amount of FUSD by the token price
      let GVTAmount = amount / self.tokenPrice
      let purchaseInfo = PurchaseInfo(address: address, amount: GVTAmount)
      self.purchases[address] = purchaseInfo

      emit Purchased(address: address, amount: amount, ticketId: purchaseInfo.ticketId)
  }

  // Distribute GVT
  // If ICO doesn't reach minimum goal, all FUSD is refunded
  pub fun distribute() {
    pre {
      // Avoid withdrawing funds before the sale ends, in case it needs refunding
        // GTokenPublicSale.saleHasEnded(): "Token sale hasn't ended"
         GTokenPublicSale.isSaleOngoing(): "Token sale hasn't ended"
         GTokenPublicSale.gvtVault.balance <= self.minCap: "The min cap wasn't reached"
         GTokenPublicSale.gvtVault.balance >= self.minCap: "The Max cap wasn't reached"
        // Set a condition to not double distribute
      }

    let Purchasers = GTokenPublicSale.getPurchasers()

    // Distribute GVT purchase to all addresses in the list
    for address in Purchasers {
      let purchaseInfo = GTokenPublicSale.getPurchase(address: address)!
      let receiverRef = getAccount(address).getCapability(GovToken.ReceiverPublicPath)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Could not borrow GovToken receiver reference")

      let gvtVault <- GTokenPublicSale.gvtVault.withdraw(amount: purchaseInfo.amount)
      // Set the state of the purchase to DISTRIBUTED
      purchaseInfo.state = PurchaseState.distributed
      GTokenPublicSale.purchases[address] = purchaseInfo
      // Deposit the withdrawn tokens into the recipient's receiver
      receiverRef.deposit(from: <- gvtVault)
      emit Distributed(address: address, gvtAmount: purchaseInfo.amount)
    }
  }

  pub fun refund() {
    pre {
      // Avoid withdrawing funds before the sale ends, in case it needs refunding
         GTokenPublicSale.saleHasEnded(): "Token sale hasn't ended"
         GTokenPublicSale.gvtVault.balance < self.minimumGoal: "The minimum goal was reached"
        // Set a condition to not double distribute
      }

    let Purchasers = GTokenPublicSale.getPurchasers()

    // Refund FUSD purchase to all addresses in the list
    for address in Purchasers {
      let purchaseInfo = GTokenPublicSale.getPurchase(address: address)!
      let receiverRef = getAccount(address).getCapability(/public/fusdReceiver)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Could not borrow FUSD receiver reference")

      let FusdAmount = purchaseInfo.amount * self.tokenPrice
      let fusdVault <- GTokenPublicSale.fusdVault.withdraw(amount: FusdAmount)
      // Set the state of the purchase to REFUNDED
      purchaseInfo.state = PurchaseState.refunded
      GTokenPublicSale.purchases[address] = purchaseInfo
      // Deposit the withdrawn tokens into the recipient's receiver
      receiverRef.deposit(from: <- fusdVault)
      emit Refunded(address: address, amount: FusdAmount)
    }
  }

  pub fun saleHasEnded(): Bool {
    return getCurrentBlock().timestamp >= self.saleEnd
  }

    pub fun isSaleOngoing(): Bool {
    return getCurrentBlock().timestamp < self.saleEnd
   
  }
  // Get Sale GVT balance

  pub fun getSaleGVTBalance(): UFix64 {
    return GTokenPublicSale.gvtVault.balance
  }

  // Get Sale FUSD balance

  pub fun getSaleFUSDBalance(): UFix64 {
    return GTokenPublicSale.fusdVault.balance
  }


  // Get all purchaser addresses
  pub fun getPurchasers(): [Address] {
      return self.purchases.keys
  }

  // Get purchase record from an address
  pub fun getPurchase(address: Address): PurchaseInfo? {
      return self.purchases[address]
  }


  init() {
    self.lockup = 0.0
    self.isLaunched = false
    self.totalIssued = 0.0
    self.tokenName = "Example Governance Token"
    self.tokenSymbol = "GVT"
    self.isSaleActive = true
    // Total supply of GVT is 600M
    self.tokenSupply = 600_000_000.0
    // For each 1FUSD buyers get 4GVT
    self.tokenPrice = 0.25
    self.saleStart = getCurrentBlock().timestamp
    self.saleEnd = self.saleStart + 2_259_000.0 // 30 days
    // A minimum of $20M is required
    self.minimumGoal = 20_000_00.0
    // Each user can purchase at most 5000 FUSD worth of GVT
    self.maxCap = 5000.0
    // Each user has to purchase at least 100 FUSD worth of GVT
    self.minCap = 100.0
    self.purchases = {}


    self.gvtVault <- GovToken.createEmptyVault()
    self.fusdVault <- FUSD.createEmptyVault()

     self.SaleAdminStoragePath = /storage/GTokenPublicSaleAdmin

    let admin <- create Admin()
    self.account.save(<- admin, to: self.SaleAdminStoragePath)

  }
}
