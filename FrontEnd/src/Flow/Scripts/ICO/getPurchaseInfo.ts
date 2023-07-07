export const getPurchaseInfo = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a


pub fun main(address: Address): GTokenPublicSale.PurchaseInfo? {
    return GTokenPublicSale.getPurchase(address: address)
}
  `
}