/** @format */

export const getUserBalance = () => {
  return `
import GovernanceToken from 0x800a10d0fff7acd4
import FungibleToken from 9a0766d93b6608b7

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(GovernanceToken.VaultPublicPath)
        .borrow<&GovernanceToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}

  `;
};
