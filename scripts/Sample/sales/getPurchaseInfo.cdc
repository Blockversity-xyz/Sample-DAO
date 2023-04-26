import SampleTokenPublicSale from "../../../contracts/sales/SampleTokenPublicSale.cdc"

pub fun main(address: Address): SampleTokenPublicSale.PurchaseInfo? {
    return SampleTokenPublicSale.getPurchase(address: address)
}