import SampleTokenPublicSale from "../../../contracts/sales/SampleTokenPublicSale.cdc"

pub fun main(): Bool {
    return SampleTokenPublicSale.getIsSaleActive()
}