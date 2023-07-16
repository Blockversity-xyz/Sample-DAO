export const mintGVT = () => {
    return `
import FungibleToken from 0xc61f695fe4f80614
import GovToken from 0xc61f695fe4f80614

transaction (amount : UFix64) {
    prepare(acct: AuthAccount) {
        let minterRef = acct.borrow<&GovToken.Minter>(from: /storage/GovTokenMinter)
            ?? panic("Could not borrow a reference to the Minter resource")

        // Mint 500 tokens
        let vault <- minterRef.mintTokens(amount: amount)
        acct.save(<-vault, to: /storage/MyVault)
    }
}
  `
}