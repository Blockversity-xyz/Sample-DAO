export const getAllPurchases = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614


pub fun main(): {Address: GovTokenPublicSale.PurchaseInfo}  {
    return GovTokenPublicSale.getAllPurchases()
}
  `
}