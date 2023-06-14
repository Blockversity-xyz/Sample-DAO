export const getIsSaleActive = () => {
  return `
import BlockVersityTokenPublicSale from 0x49a232bb31e5dd58

pub fun main(): Bool  {
    return BlockVersityTokenPublicSale.getIsSaleActive()
}
  `
}