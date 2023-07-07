export const launchToken = () => {
  return `
import GTokenPublicSale from 0x3c407ff30723099a


transaction (name : String, symbol : String, minCap: UFix64, maxCap: UFix64 ,  start:UFix64, end :UFix64, price: UFix64, goal: UFix64 , lockup: UFix64, ) {
    prepare(acct: AuthAccount) {
        let adminRef = acct.borrow<&GTokenPublicSale.Admin>(from: /storage/GTokenPublicSaleAdmin)
            ?? panic("Could not borrow reference to the Admin contract")

        adminRef.setTokenName(name: name)
        adminRef.setTokenSymbol(symbol: symbol)
        adminRef.setTokenPrice(price: price)
        adminRef.setLockup(lockup: lockup)
        adminRef.setSaleStart(start: start)
        adminRef.setSaleEnd(end: end)
        adminRef.setMinCap(cap: minCap)
        adminRef.setMaxCap(cap: maxCap)
        adminRef.setMinimumGoal(goal: goal)
        log(price)
        
    }
}

  `;
};
