export const launchToken = () => {
  return `
import GovTokenPublicSale from 0xc61f695fe4f80614


transaction (name : String, symbol : String, minCap: UFix64, maxCap: UFix64 ,  start:UFix64, end :UFix64, price: UFix64, goal: UFix64 , lockup: UFix64, ) {
    prepare(acct: AuthAccount) {
        let adminRef = acct.borrow<&GovTokenPublicSale.Admin>(from: /storage/GovTokenPublicSaleAdmin)
            ?? panic("Could not borrow reference to the Admin contract")

        adminRef.setTokenName(name: name,  addr: acct.address)
        adminRef.setTokenSymbol(symbol: symbol,  addr: acct.address)
        adminRef.setTokenPrice(price: price,  addr: acct.address)
        adminRef.setLockup(lockup: lockup)
        adminRef.setSaleStart(start: start,  addr: acct.address)
        adminRef.setSaleEnd(end: end,  addr: acct.address)
        adminRef.setMinCap(cap: minCap,  addr: acct.address)
        adminRef.setMaxCap(cap: maxCap,  addr: acct.address)
        adminRef.setMinimumGoal(goal: goal,  addr: acct.address)
        log(price)
        
    }
}

  `;
};
