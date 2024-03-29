package main

import (
	"fmt"
	"testing"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
	"github.com/stretchr/testify/assert"
)

func TestSetupAccount(t *testing.T) {

	o, err := OverflowTesting()
	assert.NoError(t, err)

	o.Tx("/Sample/token/setup_account_MetadataViews",
		WithSigner("bob"),
	).AssertSuccess(t).Print()

	resultBob := o.Script("/Sample/token/getBalance",
		WithSigner("account"),
		WithArg("account", "bob"),
	).Result
	color.Green("Bob's balance is")
	fmt.Println(resultBob)

	o.Tx("/fusd/setup_account",
		WithSigner("bob"),
	).AssertSuccess(t).Print()

	isBobSetup := o.Script("/fusd/check_setup",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Is Bob's account setup for FUSD?")
	fmt.Println(isBobSetup)

	o.Tx("/fusd/setup_minter",
		WithSigner("account"),
	).AssertSuccess(t)

	o.Tx("/fusd/deposit_minter",
		WithSigner("account"),
		WithArg("minterAddress", "account"),
	).AssertSuccess(t)

	o.Tx("/fusd/mint",
		WithSigner("account"),
		WithArg("amount", "100.0"),
		WithArg("to", "bob"),
	).AssertSuccess(t).Print()

	FUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance is")
	fmt.Println(FUSDBalance)
}

func TestAdmin(t *testing.T) {

	o, err := OverflowTesting()
	assert.NoError(t, err)

	STBalance := o.Script("/Sample/token/getBalance",
		WithSigner("account"),
		WithArg("account", "account"),
	).Result
	color.Green("Account's ST balance is")
	fmt.Println(STBalance)

	o.Tx("/Sample/sales/public/admin/depositST",
		WithSigner("account"),
		WithArg("amount", "1000.0"),
	).AssertSuccess(t)

	STVault := o.Script("/Sample/sales/getSTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's Vault balance is: ")
	fmt.Println(STVault)
}

// Bob buys ST with FUSD

func TestPurchaseST(t *testing.T) {

	o, err := OverflowTesting()
	assert.NoError(t, err)

	o.Tx("/Sample/token/setup_account_MetadataViews",
		WithSigner("bob"),
	).AssertSuccess(t)
	color.Green("Bob's account has been setup for ST")

	STVault := o.Script("/Sample/sales/getSTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's ST Vault balance is:")
	fmt.Println(STVault)

	o.Tx("/fusd/setup_account",
		WithSigner("bob"),
	).AssertSuccess(t)
	color.Green("Bob's account has been setup for FUSD")

	isBobSetup := o.Script("/fusd/check_setup",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Is Bob's account setup for FUSD?")
	fmt.Println(isBobSetup)

	o.Tx("/fusd/setup_minter",
		WithSigner("account"),
	).AssertSuccess(t)

	o.Tx("/fusd/deposit_minter",
		WithSigner("account"),
		WithArg("minterAddress", "account"),
	).AssertSuccess(t)

	FUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance is")
	fmt.Println(FUSDBalance)

	o.Tx("/fusd/mint",
		WithSigner("account"),
		WithArg("amount", "1000.0"),
		WithArg("to", "bob"),
	).AssertSuccess(t)
	color.Green("Emulator Account has minted 1000 FUSD into Bob's account")

	o.Tx("/Sample/sales/public/admin/depositST",
		WithSigner("account"),
		WithArg("amount", "500.0"),
	).AssertSuccess(t)
	color.Green("Emulator Account has deposited 500 ST into ICO's smart contract")

	AccountSTVault := o.Script("/Sample/sales/getSTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's ST balance is: ")
	fmt.Println(AccountSTVault)

	beforeFUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance before the purchase is")
	fmt.Println(beforeFUSDBalance)

	beforeAccountFUSDVault := o.Script("/Sample/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance before purchase is: ")
	fmt.Println(beforeAccountFUSDVault)

	// Attempt to purchase before the sale is active

	color.Green("Bob will attempt to buy when the sale is not active")
	o.Tx("/Sample/sales/public/purchaseST",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "Token sale is not active")
	color.Cyan("Bob couldn't buy ST because the sale is not active")

	o.Tx("/Sample/sales/public/admin/unpause",
		WithSigner("account"),
	).AssertSuccess(t)
	color.Red("The Sale has been activated(unpaused)")

	// Attempt to purchase without being Whitelisted
	color.Green("Bob will attempt to buy without being Whitelisted")
	o.Tx("/Sample/sales/public/purchaseST",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "This Address is not in the Whitelist")
	color.Cyan("Bob couldn't buy ST because he's not Whitelisted")

	// Bob signs the Whitelist

	color.Green("Bob will sign the Whitelist")
	o.Tx("/Sample/Whitelist/sign_whitelist",
		WithSigner("bob"),
	).AssertSuccess(t)

	// Attempt to purchase above personal cap

	color.Green("Bob will attempt to buy $1000 worth of ST!")
	o.Tx("/Sample/sales/public/purchaseST",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "Purchase amount exceeds personal cap")
	color.Cyan("Bob couldn't buy pass his personal cap")

	color.Green("Bob will attempt to buy $500 worth of ST!")
	o.Tx("/Sample/sales/public/purchaseST",
		WithSigner("bob"),
		WithArg("amount", "500.0"),
	).AssertSuccess(t)

	updatedFUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance after the purchase is")
	fmt.Println(updatedFUSDBalance)

	beforeResultBob := o.Script("/Sample/token/getBalance",
		WithSigner("account"),
		WithArg("account", "bob"),
	).Result
	color.Green("Bob's ST balance before distribution is")
	fmt.Println(beforeResultBob)

	AccountFUSDVault := o.Script("/Sample/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance after purchase is: ")
	fmt.Println(AccountFUSDVault)

	o.Tx("/Sample/sales/public/admin/distribute",
		WithSigner("account"),
		WithArg("address", "bob"),
		WithArg("allocationAmount", "100.0"),
	)
	color.Red("ST Has been distributed to Bob!")

	resultBob := o.Script("/Sample/token/getBalance",
		WithSigner("account"),
		WithArg("account", "bob"),
	).Result
	color.Green("Bob's ST balance after distribution is")
	fmt.Println(resultBob)

	refundFUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance after the distribution and refund is")
	fmt.Println(refundFUSDBalance)

	afterAccountFUSDVault := o.Script("/Sample/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance after distribution and refund is: ")
	fmt.Println(afterAccountFUSDVault)

	afterAccountSTVault := o.Script("/Sample/sales/getSTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's ST balance after distribution is: ")
	fmt.Println(afterAccountSTVault)
}
