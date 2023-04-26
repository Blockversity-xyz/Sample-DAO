import SampleTokenPublicSale from "../../../contracts/sales/SampleTokenPublicSale.cdc"

pub fun main(): UFix64 {
    return SampleTokenPublicSale.getSTVaultBalance()
}