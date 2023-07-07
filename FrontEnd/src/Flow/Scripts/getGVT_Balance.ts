/** @format */

export const getUserBalance = () => {
  return `
import GovToken from 0x3c407ff30723099a
import FungibleToken from 9a0766d93b6608b7

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(GovToken.VaultPublicPath)
        .borrow<&GovToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}

  `;
};
