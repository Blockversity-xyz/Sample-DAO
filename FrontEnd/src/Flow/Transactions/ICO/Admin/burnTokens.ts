export const burnTokens = () => {
    return `
import FungibleToken from 0xc61f695fe4f80614
import GToken from 0xc61f695fe4f80614
import GovTokenPublicSale from 0xc61f695fe4f80614

transaction(amount: UFix64) {

    prepare(signer: AuthAccount) {

     let provider = getAccount(0xc61f695fe4f80614)
        let providerVaultRef = provider
            .getCapability(GToken.VaultPublicPath)
            .borrow<&GToken.Vault{FungibleToken.Provider}>()
            ?? panic("Could not borrow reference to the signer's Provider Vault")

        // Burn tokens by calling the burnTokens function on the provider vault reference
        let vault <- providerVaultRef.withdraw(amount: amount)


            let burnerRef = signer.borrow<&GToken.Burner>(from: /storage/GTBurner)
            ?? panic("Could not borrow a reference to the Burner resource")

        // Burn tokens by calling the burnTokens function on the burner resource
        burnerRef.burnTokens(from: <- vault)

        log("Tokens burned successfully")
        
    }
}

  `
}