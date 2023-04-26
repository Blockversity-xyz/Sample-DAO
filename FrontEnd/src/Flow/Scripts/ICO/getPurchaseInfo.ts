export const getPurchaseInfo = () => {
  return `
import SampleTokenPublicSale from 0x49a232bb31e5dd58

pub fun main(address: Address): SampleTokenPublicSale.PurchaseInfo? {
    return SampleTokenPublicSale.getPurchase(address: address)
}
  `
}