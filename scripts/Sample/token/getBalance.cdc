// This script reads the balance field of an account's GovernanceToken Balance
import GovernanceToken from "../../../contracts/GovernanceToken.cdc"
import FungibleToken from "../../../contracts/utility/FungibleToken.cdc"

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(GovernanceToken.VaultPublicPath)
        .borrow<&GovernanceToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}
