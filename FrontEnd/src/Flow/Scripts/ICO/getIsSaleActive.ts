export const getIsSaleActive = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a


pub fun main(): Bool  {
    return GTokenPublicSale.saleHasEnded()
}
  `
}