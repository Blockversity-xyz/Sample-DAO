
export const deployUsdc = () => {
    return `
    transaction(contractName: String, code: String) {
        prepare(owner: AuthAccount) {
            let existingContract = owner.contracts.get(name: contractName)
    
            if (existingContract == nil) {
                owner.contracts.add(name: contractName, code: code.decodeHex())
            } else {
                owner.contracts.update__experimental(name: contractName, code: code.decodeHex())
            }
        }
    }
    `;
}
