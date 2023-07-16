/** @format */

export const getSaleInfo = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614


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
  `;
};
