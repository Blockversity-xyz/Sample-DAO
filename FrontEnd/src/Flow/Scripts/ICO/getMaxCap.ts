export const getMaxCap = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74


pub fun main(): UFix64 {
    return GovTokenPublicSale.getMax()
}
  `
}