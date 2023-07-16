export const getPurchasers = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614


pub fun main(): [Address] {
    return GovTokenPublicSale.getPurchasers()
}
  `
}