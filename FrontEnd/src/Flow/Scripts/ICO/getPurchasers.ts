export const getPurchasers = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a


pub fun main(): [Address] {
    return GTokenPublicSale.getPurchasers()
}
  `
}