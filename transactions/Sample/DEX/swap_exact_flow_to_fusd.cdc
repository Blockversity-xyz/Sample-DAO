import FungibleToken from "../../../contracts/utility/FungibleToken.cdc"
import SwapRouter from "../../../contracts/DEX/SwapRouter.cdc"

transaction(
    exactAmountIn: UFix64,
    amountOutMin: UFix64,
    path: [String],
    to: Address,
    deadline: UFix64
) {
    prepare(userAccount: AuthAccount) {
        let tokenInVaultPath = /storage/flowTokenVault
        let tokenOutReceiverPath = /public/USDCVaultReceiver

        let inVaultRef = userAccount.borrow<&FungibleToken.Vault>(from: tokenInVaultPath)
            ?? panic("Could not borrow reference to the owner's in FT.Vault")
        /// Note: Receiver (to) should already have out FT.Vault initialized, otherwise tx reverts.
        let outReceiverRef = getAccount(to).getCapability(tokenOutReceiverPath)
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Could not borrow receiver reference to the recipient's out FT.Vault")

        let exactVaultIn <- inVaultRef.withdraw(amount: exactAmountIn)
        let vaultOut <- SwapRouter.swapExactTokensForTokens(
            exactVaultIn: <-exactVaultIn,
            amountOutMin: amountOutMin,
            tokenKeyPath: path,
            deadline: deadline
        )
        outReceiverRef.deposit(from: <-vaultOut)
    }
}