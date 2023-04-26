import SampleTokenMetadataViews from "../../../contracts/SampleTokenMetadataViews.cdc"

pub fun main(): UFix64 {
    return SampleTokenMetadataViews.totalSupply
}