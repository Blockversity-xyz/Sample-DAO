export const getPurchaseInfo = () => {
  return `
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58

pub fun main(address: Address): BlockVersityTokenPublicSale.PurchaseInfo? {
    return BlockVersityTokenPublicSale.getPurchase(address: address)
}
  `
}