export const getGovToken = () => {
    return `
  
import GToken from 0xc61f695fe4f80614
import FungibleToken from 0xc61f695fe4f80614

pub fun main(): UFix64 {

    let provider = getAccount(0xc61f695fe4f80614)
             let providerVaultRef = provider
            .getCapability(GToken.ViewerPublicPath)
            .borrow<&GToken.Vault{FungibleToken.Balance}>()
            ?? panic("Could not borrow reference to the signer's Provider Vault")
    
    return providerVaultRef.balance
}
  `
}