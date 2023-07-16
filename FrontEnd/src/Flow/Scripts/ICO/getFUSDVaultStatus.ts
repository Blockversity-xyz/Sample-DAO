
export const getFUSDVaultStatus = () => {
  return `
import FungibleToken from 0xc61f695fe4f80614
import FUSD from 0xc61f695fe4f80614

pub fun main(address: Address): Bool {
    let account = getAccount(address)

    let receiverRef = account.getCapability(/public/fusdReceiver)
        .borrow<&FUSD.Vault{FungibleToken.Receiver}>()
        ?? nil

    let balanceRef = account.getCapability(/public/fusdBalance)
        .borrow<&FUSD.Vault{FungibleToken.Balance}>()
        ?? nil

    return (receiverRef != nil) && (balanceRef != nil)
}
  `
}