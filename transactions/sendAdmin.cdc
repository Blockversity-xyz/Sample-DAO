transaction {
  prepare(acct: AuthAccount) {
    // Load the resource from the sender's account storage
    let resource <- acct.load<@ResourceType>(from: /storage/ResourcePath)
      ?? panic("Could not load the resource from the sender's account storage")

    // Save the resource to the receiver's account storage
    getAccount(ReceiverAddress).save<@ResourceType>(<-resource, to: /storage/ResourcePath)
  }
}