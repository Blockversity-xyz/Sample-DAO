export const getSTBalance = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58

pub fun main(): UFix64 {
    return SampleTokenPublicSale.getSTVaultBalance()
}
  `
}