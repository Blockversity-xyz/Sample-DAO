export const getGVTPublicSaleBalance = () => {
  return `

import GovTokenPublicSale from 0xba85020e56e96b74


pub fun main(address: Address): GovTokenPublicSale.PurchaseInfo? {
    return GovTokenPublicSale.getPurchase(address: address)
}

  `
}