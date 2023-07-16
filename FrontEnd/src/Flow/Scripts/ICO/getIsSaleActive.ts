export const getIsSaleActive = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614


pub fun main(): Bool  {
    return GovTokenPublicSale.saleHasEnded()
}
  `
}