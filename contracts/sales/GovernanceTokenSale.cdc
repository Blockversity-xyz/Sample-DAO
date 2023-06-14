import FungibleToken from "../utility/FungibleToken.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"
import GovernanceToken from "../GovernanceToken.cdc"
import FUSD from "../utility/FUSD.cdc"

pub contract GovernanceTokenPublicSale {

  /****** Contract Variables ******/

  // Define the ICO Token and Sale Details
  pub let tokenName: String
  pub let tokenSymbol: String
  pub let tokenSupply: UFix64
  pub let tokenPrice: UFix64
  pub let saleStart: UFix64
  pub let saleEnd: UFix64
  pub let minimumGoal: UFix64
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

  // gVT holder vault
  access(contract) let gvtVault: @GovernanceToken.Vault

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


  pub resource Admin {

      pub fun withdrawFUSD(amount: UFix64): @FungibleToken.Vault {
        pre {
          // Avoid withdrawing funds before the sale ends, in case it needs refunding
          GovernanceTokenPublicSale.saleHasEnded() == false: "Token sale hasn't ended"
        }
        return <- GovernanceTokenPublicSale.fusdVault.withdraw(amount: amount)
      }

      pub fun depositGVT(from: @FungibleToken.Vault) {
          GovernanceTokenPublicSale.gvtVault.deposit(from: <- from)
      }
    }

  // GVT purchase method
  // User pays FUSD and get unlocked SampleToken
  pub fun purchase(from: @FUSD.Vault, address: Address) {
      pre {
          self.saleHasEnded(): "Token sale has ended"
          self.purchases[address] == nil: "Already purchased by the same account"
          from.balance <= self.maxCap: "Purchase amount exceeds personal cap"
          from.balance >= self.minCap: "Purchase amount does not reach the minimum cap"
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
         GovernanceTokenPublicSale.saleHasEnded(): "Token sale hasn't ended"
         GovernanceTokenPublicSale.gvtVault.balance >= self.minimumGoal: "The minimum goal wasn't reached"
        // Set a condition to not double distribute
      }

    let Purchasers = GovernanceTokenPublicSale.getPurchasers()

    // Distribute GVT purchase to all addresses in the list
    for address in Purchasers {
      let purchaseInfo = GovernanceTokenPublicSale.getPurchase(address: address)!
      let receiverRef = getAccount(address).getCapability(GovernanceToken.ReceiverPublicPath)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Could not borrow GovernanceToken receiver reference")

      let gvtVault <- GovernanceTokenPublicSale.gvtVault.withdraw(amount: purchaseInfo.amount)
      // Set the state of the purchase to DISTRIBUTED
      purchaseInfo.state = PurchaseState.distributed
      GovernanceTokenPublicSale.purchases[address] = purchaseInfo
      // Deposit the withdrawn tokens into the recipient's receiver
      receiverRef.deposit(from: <- gvtVault)
      emit Distributed(address: address, gvtAmount: purchaseInfo.amount)
    }
  }

  pub fun refund() {
    pre {
      // Avoid withdrawing funds before the sale ends, in case it needs refunding
         GovernanceTokenPublicSale.saleHasEnded(): "Token sale hasn't ended"
         GovernanceTokenPublicSale.gvtVault.balance < self.minimumGoal: "The minimum goal was reached"
        // Set a condition to not double distribute
      }

    let Purchasers = GovernanceTokenPublicSale.getPurchasers()

    // Refund FUSD purchase to all addresses in the list
    for address in Purchasers {
      let purchaseInfo = GovernanceTokenPublicSale.getPurchase(address: address)!
      let receiverRef = getAccount(address).getCapability(/public/fusdReceiver)
          .borrow<&{FungibleToken.Receiver}>()
          ?? panic("Could not borrow FUSD receiver reference")

      let FusdAmount = purchaseInfo.amount * self.tokenPrice
      let fusdVault <- GovernanceTokenPublicSale.fusdVault.withdraw(amount: FusdAmount)
      // Set the state of the purchase to REFUNDED
      purchaseInfo.state = PurchaseState.refunded
      GovernanceTokenPublicSale.purchases[address] = purchaseInfo
      // Deposit the withdrawn tokens into the recipient's receiver
      receiverRef.deposit(from: <- fusdVault)
      emit Refunded(address: address, amount: FusdAmount)
    }
  }

  pub fun saleHasEnded(): Bool {
    return getCurrentBlock().timestamp >= self.saleEnd
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
    self.tokenName = "Example Governance Token"
    self.tokenSymbol = "GVT"
    // Total supply of GVT is 300M
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


    self.gvtVault <- GovernanceToken.createEmptyVault()
    self.fusdVault <- FUSD.createEmptyVault()



  }
}
