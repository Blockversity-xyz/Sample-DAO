/** @format */

export const getSaleInfo = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a


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

pub fun main(): Info {

  return Info(
    tokenName: GTokenPublicSale.tokenName,
    tokenSymbol: GTokenPublicSale.tokenSymbol,
    lockup: GTokenPublicSale.lockup,
    tokenSupply: GTokenPublicSale.tokenSupply,
    tokenPrice: GTokenPublicSale.tokenPrice,
    saleStart: GTokenPublicSale.saleStart,
    saleEnd: GTokenPublicSale.saleEnd,
    minimumGoal:GTokenPublicSale.minimumGoal,
    purchasers: GTokenPublicSale.getPurchasers()
  )
}
  `;
};
