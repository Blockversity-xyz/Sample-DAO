export const getFUSDVaultBalance = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a


pub fun main(): UFix64 {
    return GTokenPublicSale.getFUSDVaultBalance()
}
  `
}