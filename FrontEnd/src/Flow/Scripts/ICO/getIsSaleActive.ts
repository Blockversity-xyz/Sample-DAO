export const getIsSaleActive = () => {
  return `
import GovTokenPublicSale from 0xba85020e56e96b74


pub fun main(): Bool  {
    return GovTokenPublicSale.saleHasEnded()
}
  `
}