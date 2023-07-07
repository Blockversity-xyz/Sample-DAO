export const newMinter = () => {
    return `
import GovToken from 0x3c407ff30723099a


transaction (){
    prepare(acct: AuthAccount) {
        let adminRef = acct.borrow<&GovToken.Administrator>(from: /storage/GovTokenAdmin)
            ?? panic("Could not borrow a reference to the Administrator resource")

        let amount = 10000000.0
        // Create a new minter with the allowed amount of tokens
        let minter <- adminRef.createNewMinter(allowedAmount: amount)
        acct.save(<-minter, to: /storage/GovTokenMinter)
    }
}
  `
}