pub contract AllowList {

    // Contract Information
    pub var addressInfo: {Address: UFix64}

    // Events
    pub event ContractInitialized()
    pub event Signed(user: Address, timestamp: UFix64)
    // Public function to add a new Address
    pub fun addAddress(newAddress: Address) {
        pre {
            self.addressInfo[newAddress] == nil: "This address has already signed!"
        }

        let timestamp = getCurrentBlock().timestamp
        self.addressInfo[newAddress] = timestamp

        emit Signed(user: newAddress, timestamp: timestamp)
    }
    pub fun checkList(addr: Address) : Bool{
    return self.addressInfo[addr] == nil
    }

    init() {
        self.addressInfo = {}

        emit ContractInitialized()
    }

}
