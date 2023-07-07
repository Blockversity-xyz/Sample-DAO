export const mintGVT = () => {
    return `
import FungibleToken from 0x01
import GovToken from 0x3c407ff30723099a

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