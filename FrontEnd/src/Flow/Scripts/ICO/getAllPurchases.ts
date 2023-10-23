export const getAllPurchases = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74


pub fun main(): {Address: GovTokenPublicSale.PurchaseInfo}  {
    return GovTokenPublicSale.getAllPurchases()
}
  `
}