/** @format */

export const getUserBalance = () => {
  return `
import GToken from 0xba85020e56e96b74
import FungibleToken from 0xc61f695fe4f80614

pub fun main(account: Address): UFix64 {
    let acct = getAccount(account)
    let vaultRef = acct.getCapability(GToken.VaultPublicPath)
        .borrow<&GToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}

  `;
};
