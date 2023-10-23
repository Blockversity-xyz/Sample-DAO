import FungibleToken from 0xc61f695fe4f80614
import NonFungibleToken from 0xc61f695fe4f80614
import GToken from 0xba85020e56e96b74
import FiatToken from 0xa4f61a30f7716c6f
import AllowList from 0xba85020e56e96b74


pub contract GovTokenPublicSale {

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
  // GVT community sale purchase cap (in FiatToken)
  access(contract) var maxCap: UFix64
  // Minimum amount to buy  (in FiatToken)
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
  access(contract) let gvtVault: @GToken.Vault

  // FiatToken holder vault
  access(contract) let FiatTokenVault: @FiatToken.Vault

  // Workaround random number generator
  pub resource Random {}

  pub struct PurchaseInfo {
      // Purchaser address
      pub let address: Address
      // Purchase amount in FiatToken
      pub(set) var amount: UFix64
      // Refunded amount in FiatToken
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
        pub fun claimAdmin(): @GovTokenPublicSale.Admin {
        return <- create Admin()
    }
  pub resource Admin {

      pub fun setLockup(lockup: UFix64) {
      
          GovTokenPublicSale.lockup = lockup
      }
      
      pub fun setTokenName(name: String, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
          GovTokenPublicSale.tokenName = name
      }
      pub fun setTokenSymbol(symbol: String, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
          GovTokenPublicSale.tokenSymbol = symbol
      }
      pub fun setTokenPrice(price: UFix64, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
          GovTokenPublicSale.tokenPrice = price
      }
      pub fun setSaleStart(start: UFix64, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
          GovTokenPublicSale.saleStart = start
      }
      pub fun setSaleEnd(end: UFix64, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
          GovTokenPublicSale.saleEnd = end
      }
      pub fun setMinimumGoal(goal: UFix64, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
          GovTokenPublicSale.minimumGoal = goal
      }
        pub fun setMaxCap(cap: UFix64, addr: Address) {
      pre {
        self.isAllowed(addr: addr)
      }
            GovTokenPublicSale.maxCap = cap
        }
        pub fun setMinCap(cap: UFix64, addr: Address) {
          pre {
        self.isAllowed(addr: addr)
      }
            GovTokenPublicSale.minCap = cap
        }

        pub fun isAllowed(addr :Address): Bool {
            return AllowList.checkList(addr: addr)
        }
        

      pub fun isLauched() {
          GovTokenPublicSale.isLaunched = true
      }

            pub fun unpause() {
            GovTokenPublicSale.isSaleActive = true
        }

        pub fun pause() {
            GovTokenPublicSale.isSaleActive = false
        }

      pub fun withdrawFiatToken(amount: UFix64): @FungibleToken.Vault {
        pre {
          // Avoid withdrawing funds before the sale ends, in case it needs refunding
          GovTokenPublicSale.saleHasEnded() == false: "Token sale hasn't ended"
        }
        return <- GovTokenPublicSale.FiatTokenVault.withdraw(amount: amount)
      }

      pub fun depositGVT(from: @FungibleToken.Vault) {
          GovTokenPublicSale.gvtVault.deposit(from: <- from)
      }
    }

  // GVT purchase method
  // User pays FiatToken and get unlocked SampleToken
  pub fun purchase(from: @FiatToken.Vault, address: Address) {
      pre {
          self.isSaleOngoing() : "Token sale has not ended"
          self.isSaleActive : "Token sale is still active"

      }

      let amount = from.balance
      self.FiatTokenVault.deposit(from: <- from)

      // Divide the amount of FiatToken by the token price
      let GVTAmount = amount / self.tokenPrice
      let purchaseInfo = PurchaseInfo(address: address, amount: GVTAmount)
      self.purchases[address] = purchaseInfo

      emit Purchased(address: address, amount: amount, ticketId: purchaseInfo.ticketId)
  }

  // Distribute GVT
  // If ICO doesn't reach minimum goal, all FiatToken is refunded
  pub fun distribute() {
    pre {
         GovTokenPublicSale.isSaleOngoing(): "Token sale hasn't ended"
         GovTokenPublicSale.gvtVault.balance <= self.minCap: "The min cap wasn't reached"
         GovTokenPublicSale.gvtVault.balance >= self.minCap: "The Max cap wasn't reached"
        // Set a condition to not double distribute
      }

    let Purchasers = GovTokenPublicSale.getPurchasers()

    // Distribute GVT purchase to all addresses in the list
    for address in Purchasers {
      let purchaseInfo = GovTokenPublicSale.getPurchase(address: address)!
      let receiverRef = getAccount(address).getCapability(/public/DemoGTokenReceiver)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Could not borrow GToken receiver reference")

      let gvtVault <- GovTokenPublicSale.gvtVault.withdraw(amount: purchaseInfo.amount)
      // Set the state of the purchase to DISTRIBUTED
      purchaseInfo.state = PurchaseState.distributed
      GovTokenPublicSale.purchases[address] = purchaseInfo
      // Deposit the withdrawn tokens into the recipient's receiver
      receiverRef.deposit(from: <- gvtVault)
      emit Distributed(address: address, gvtAmount: purchaseInfo.amount)
    }
  }

  pub fun refund() {
    pre {
      // Avoid withdrawing funds before the sale ends, in case it needs refunding
         GovTokenPublicSale.saleHasEnded(): "Token sale hasn't ended"
         GovTokenPublicSale.gvtVault.balance < self.minimumGoal: "The minimum goal was reached"
        // Set a condition to not double distribute
      }

    let Purchasers = GovTokenPublicSale.getPurchasers()

    // Refund FiatToken purchase to all addresses in the list
    for address in Purchasers {
      let purchaseInfo = GovTokenPublicSale.getPurchase(address: address)!
      let receiverRef = getAccount(address).getCapability(/public/FVaultReceiverPubPath)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Could not borrow FiatToken receiver reference")

      let FiatTokenAmount = purchaseInfo.amount * self.tokenPrice
      let FiatTokenVault <- GovTokenPublicSale.FiatTokenVault.withdraw(amount: FiatTokenAmount)
      // Set the state of the purchase to REFUNDED
      purchaseInfo.state = PurchaseState.refunded
      GovTokenPublicSale.purchases[address] = purchaseInfo
      // Deposit the withdrawn tokens into the recipient's receiver
      receiverRef.deposit(from: <- FiatTokenVault)
      emit Refunded(address: address, amount: FiatTokenAmount)
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
    return GovTokenPublicSale.gvtVault.balance
  }

  // Get Sale FiatToken balance

  pub fun getSaleFiatTokenBalance(): UFix64 {
    return GovTokenPublicSale.FiatTokenVault.balance
  }


  // Get all purchaser addresses
  pub fun getPurchasers(): [Address] {
      return self.purchases.keys
  }

  // Get purchase record from an address
  pub fun getPurchase(address: Address): PurchaseInfo? {
      return self.purchases[address]
  }

        // Get all purchasers and their purchase information
  pub fun getAllPurchases(): {Address: PurchaseInfo} {
    return GovTokenPublicSale.purchases
  }

  pub fun getMax(): UFix64{
    return GovTokenPublicSale.maxCap
    }

    pub fun getMin(): UFix64{
    return GovTokenPublicSale.minCap
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
    // For each 1FiatToken buyers get 4GVT
    self.tokenPrice = 0.25
    self.saleStart = getCurrentBlock().timestamp
    self.saleEnd = self.saleStart + 2_259_000.0 // 30 days
    // A minimum of $20M is required
    self.minimumGoal = 20_000_00.0
    // Each user can purchase at most 5000 FiatToken worth of GVT
    self.maxCap = 5000.0
    // Each user has to purchase at least 100 FiatToken worth of GVT
    self.minCap = 100.0
    self.purchases = {}


    self.gvtVault <- GToken.createEmptyVault()
    self.FiatTokenVault <- FiatToken.createEmptyVault()

     self.SaleAdminStoragePath = /storage/GovTokenPublicSaleAdmin

    let admin <- create Admin()
    self.account.save(<- admin, to: self.SaleAdminStoragePath)

  }
}
