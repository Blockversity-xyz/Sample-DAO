export const newMinter = () => {
    return `
import GovToken from 0xc61f695fe4f80614


transaction (){
    prepare(acct: AuthAccount) {
        let adminRef = acct.borrow<&GovToken.Administrator>(from: /storage/GovTokenAdmin)
            ?? panic("Could not borrow a reference to the Administrator resource")

        let amount = 100000000.0
        // Create a new minter with the allowed amount of tokens
        let minter <- adminRef.createNewMinter(allowedAmount: amount)
        acct.save(<-minter, to: /storage/GovTokenMinter)
    }
}
  `
}