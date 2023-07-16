export const getGVTPublicSaleBalance = () => {
  return `

import GovTokenPublicSale from 0xc61f695fe4f80614


pub fun main(address: Address): GovTokenPublicSale.PurchaseInfo? {
    return GovTokenPublicSale.getPurchase(address: address)
}

  `
}