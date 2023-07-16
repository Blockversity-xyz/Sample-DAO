export const getMinCap = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614


pub fun main(): UFix64 {
    return GovTokenPublicSale.getMin()
}
  `
}