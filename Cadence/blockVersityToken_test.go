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

	o.Tx("/BlockVersity/token/setup_account_MetadataViews",
		WithSigner("bob"),
	).AssertSuccess(t).Print()

	resultBob := o.Script("/BlockVersity/token/getBalance",
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

	BVTBalance := o.Script("/BlockVersity/token/getBalance",
		WithSigner("account"),
		WithArg("account", "account"),
	).Result
	color.Green("Account's BVT balance is")
	fmt.Println(BVTBalance)

	o.Tx("/BlockVersity/sales/public/admin/depositBVT",
		WithSigner("account"),
		WithArg("amount", "1000.0"),
	).AssertSuccess(t)

	BVTVault := o.Script("/BlockVersity/sales/getBVTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's Vault balance is: ")
	fmt.Println(BVTVault)
}

// Bob buys BVT with FUSD

func TestPurchaseBVT(t *testing.T) {

	o, err := OverflowTesting()
	assert.NoError(t, err)

	o.Tx("/BlockVersity/token/setup_account_MetadataViews",
		WithSigner("bob"),
	).AssertSuccess(t)
	color.Green("Bob's account has been setup for BVT")

	BVTVault := o.Script("/BlockVersity/sales/getBVTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's BVT Vault balance is:")
	fmt.Println(BVTVault)

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

	o.Tx("/BlockVersity/sales/public/admin/depositBVT",
		WithSigner("account"),
		WithArg("amount", "1000.0"),
	).AssertSuccess(t)
	color.Green("Emulator Account has deposited 1000 BVT into ICO's smart contract")

	o.Tx("/BlockVersity/sales/public/admin/unpause",
		WithSigner("account"),
	).AssertSuccess(t)
	color.Red("The Sale has been activated(unpaused)")

	AccountBVTVault := o.Script("/BlockVersity/sales/getBVTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's BVT balance is: ")
	fmt.Println(AccountBVTVault)

	beforeFUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance before the purchase is")
	fmt.Println(beforeFUSDBalance)

	beforeAccountFUSDVault := o.Script("/BlockVersity/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance before purchase is: ")
	fmt.Println(beforeAccountFUSDVault)

	// Attempt to purchase without being Whitelisted
	color.Green("Bob will attempt to buy without being Whitelisted")
	o.Tx("/BlockVersity/sales/public/purchaseBVT",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "This Address is not in the Whitelist").Print()
	color.Cyan("Bob couldn't buy BVT because he's not Whitelisted")

	// Bob signs the Whitelist

	color.Green("Bob will sign the Whitelist")
	o.Tx("/BlockVersity/Whitelist/sign_whitelist",
		WithSigner("bob"),
	).AssertSuccess(t)

	// Attempt to purchase above personal cap

	color.Green("Bob will attempt to buy $1000 worth of BVT!")
	errorResult := o.Tx("/BlockVersity/sales/public/purchaseBVT",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "Purchase amount exceeds personal cap").Err
	fmt.Println(errorResult)
	color.Cyan("Bob couldn't buy pass his personal cap")

	color.Green("Bob will attempt to buy $500 worth of BVT!")
	o.Tx("/BlockVersity/sales/public/purchaseBVT",
		WithSigner("bob"),
		WithArg("amount", "500.0"),
	).AssertSuccess(t)

	updatedFUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance after the purchase is")
	fmt.Println(updatedFUSDBalance)

	beforeResultBob := o.Script("/BlockVersity/token/getBalance",
		WithSigner("account"),
		WithArg("account", "bob"),
	).Result
	color.Green("Bob's BVT balance before distribution is")
	fmt.Println(beforeResultBob)

	AccountFUSDVault := o.Script("/BlockVersity/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance after purchase is: ")
	fmt.Println(AccountFUSDVault)

	o.Tx("/BlockVersity/sales/public/admin/distribute",
		WithSigner("account"),
		WithArg("address", "bob"),
		WithArg("allocationAmount", "100.0"),
	)
	color.Red("BVT Has been distributed to Bob!")

	resultBob := o.Script("/BlockVersity/token/getBalance",
		WithSigner("account"),
		WithArg("account", "bob"),
	).Result
	color.Green("Bob's BVT balance after distribution is")
	fmt.Println(resultBob)

	refundFUSDBalance := o.Script("/fusd/get_balance",
		WithSigner("account"),
		WithArg("address", "bob"),
	).Result
	color.Green("Bob's FUSD balance after the distribution and refund is")
	fmt.Println(refundFUSDBalance)

	afterAccountFUSDVault := o.Script("/BlockVersity/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance after distribution and refund is: ")
	fmt.Println(afterAccountFUSDVault)
}
