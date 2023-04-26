import BlockVersityToken from "../../../contracts/BlockVersityToken.cdc"
import FUSD from "../../../contracts/utility/FUSD.cdc"

/// Pair creator needs to pay the deployment fee of 0.001 Flow.
import FlowToken from "../../../contracts/utility/FlowToken.cdc"
import SwapFactory from "../../../contracts/DEX/SwapFactory.cdc"

/// Deploy a trading pair for USDC <-> FUSD if it doesn't exist; otherwise do nothing.
transaction() {
    prepare(deployer: AuthAccount) {
        let token0Vault <- BlockVersityToken.createEmptyVault()
        let token1Vault <- FUSD.createEmptyVault()

        /// 'A.0xADDRESS.TokenName.Vault'
        var token0Key = token0Vault.getType().identifier
        /// Get token0 identifier
        token0Key = token0Key.slice(from: 0, upTo: token0Key.length - 6)
        var token1Key = token1Vault.getType().identifier
        token1Key = token1Key.slice(from: 0, upTo: token1Key.length - 6)
        /// Check whether pair has already existed or not.
        let pairAddress = SwapFactory.getPairAddress(token0Key: token0Key, token1Key: token1Key)

        if (pairAddress == nil) {
            let flowVaultRef = deployer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!
            assert(flowVaultRef.balance >= 0.002, message: "Insufficient balance to create pair, minimum balance requirement: 0.002 flow")
            let fee <- flowVaultRef.withdraw(amount: 0.001)
            SwapFactory.createPair(token0Vault: <-token0Vault, token1Vault: <-token1Vault, accountCreationFee: <-fee)
        } else {
            /// Pair already exists
            destroy token0Vault
            destroy token1Vault
        }
    }
}
 