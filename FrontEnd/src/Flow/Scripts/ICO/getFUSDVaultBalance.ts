export const getFUSDVaultBalance = () => {
  return `
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58

pub fun main(): UFix64 {
    return BlockVersityTokenPublicSale.getFUSDVaultBalance()
}
  `
}