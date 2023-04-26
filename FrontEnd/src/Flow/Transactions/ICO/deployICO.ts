export const deployerTransactionCode = () => {
  return `

transaction(
	contractName: String,
	price: UFix64,
	contractCode: String
) {

	prepare(deployer: AuthAccount) {

		deployer.contracts.add(
			name: contractName,
			code: contractCode.decodeHex(),
			_price: price
		)
	}

}
`
}