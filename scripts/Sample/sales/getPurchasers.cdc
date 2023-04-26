import SampleTokenPublicSale from "../../../contracts/sales/SampleTokenPublicSale.cdc"

pub fun main(): [Address] {
    return SampleTokenPublicSale.getPurchasers()
}