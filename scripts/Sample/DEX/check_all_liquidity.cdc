import SwapConfig from "../../../contracts/DEX/SwapConfig.cdc"
import SwapInterfaces from "../../../contracts/DEX/SwapInterfaces.cdc"
import SwapFactory from "../../../contracts/DEX/SwapFactory.cdc"

// Script to check all the pairs LP has provided non-zero liquidity to, along with pair's LpToken balance
/// Return { pairAddress: pairLpTokenBalance }
pub fun main(lpAddr: Address): {Address: UFix64} {
    var lpTokenCollectionPublicPath = SwapConfig.LpTokenCollectionPublicPath
    let lpTokenCollectionCap = getAccount(lpAddr).getCapability<&{SwapInterfaces.LpTokenCollectionPublic}>(lpTokenCollectionPublicPath)
    if lpTokenCollectionCap.check() == false {
        // No meaningful liquidity found
        return {}
    }
    let lpTokenCollectionRef = lpTokenCollectionCap.borrow()!
    let pairs = lpTokenCollectionRef.getAllLPTokens()
    let lpBalances: {Address: UFix64} = {}
    for pair in pairs {
        var lpTokenAmount = lpTokenCollectionRef.getLpTokenBalance(pairAddr: pair)
        lpBalances[pair] = lpTokenAmount
    }
    return lpBalances
}