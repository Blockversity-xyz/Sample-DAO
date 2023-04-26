export const getPurchasers = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58

pub fun main(): [Address] {
    return SampleTokenPublicSale.getPurchasers()
}
  `
}