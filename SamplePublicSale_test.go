package main

import (
	"fmt"
	"teGVTing"

	"github.com/GVTretchr/teGVTify/assert"
	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
)

func TeGVTICO(t *teGVTing.T) {

	o, err := OverflowTeGVTing()
	assert.NoError(t, err)

	color.Green("Bob will attempt to pause the sale")
	o.Tx("/Sample/sales/public/admin/pause",
		WithSigner("bob"),
	).AssertFailure(t, "Could not borrow reference to the admin!")
	fmt.Println("Bob failed to pause the sale")

	color.Green("Admin account will attempt to pause the sale")
	o.Tx("/Sample/sales/public/admin/pause",
		WithSigner("account"),
	).AssertSuccess(t).Print()

	o.Tx("/Sample/token/setup_account_MetadataViews",
		WithSigner("bob"),
	).AssertSuccess(t)
	color.Green("Bob's account has been setup for GVT")

	GVTVault := o.Script("/Sample/sales/getGVTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's GVT Vault balance is:")
	fmt.Println(GVTVault)

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

	o.Tx("/Sample/sales/public/admin/depositGVT",
		WithSigner("account"),
		WithArg("amount", "500.0"),
	).AssertSuccess(t)
	color.Green("Emulator Account has deposited 500 GVT into ICO's smart contract")

	AccountGVTVault := o.Script("/Sample/sales/getGVTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's GVT balance is: ")
	fmt.Println(AccountGVTVault)

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
	o.Tx("/Sample/sales/public/purchaseGVT",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "Token sale is not active")
	color.Cyan("Bob couldn't buy GVT because the sale is not active")

	o.Tx("/Sample/sales/public/admin/unpause",
		WithSigner("account"),
	).AssertSuccess(t)
	color.Red("The Sale has been activated(unpaused)")

	// Attempt to purchase above personal cap

	color.Green("Bob will attempt to buy $1000 worth of GVT!")
	o.Tx("/Sample/sales/public/purchaseGVT",
		WithSigner("bob"),
		WithArg("amount", "1000.0"),
	).AssertFailure(t, "Purchase amount exceeds personal cap")
	color.Cyan("Bob couldn't buy pass his personal cap")

	color.Green("Bob will attempt to buy $500 worth of GVT!")
	o.Tx("/Sample/sales/public/purchaseGVT",
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
	color.Green("Bob's GVT balance before distribution is")
	fmt.Println(beforeResultBob)

	AccountFUSDVault := o.Script("/Sample/sales/getFUSDVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's FUSD balance after purchase is: ")
	fmt.Println(AccountFUSDVault)

	o.Tx("/Sample/sales/public/admin/diGVTribute",
		WithSigner("account"),
		WithArg("address", "bob"),
		WithArg("allocationAmount", "100.0"),
	)
	color.Red("GVT Has been diGVTributed to Bob!")

	resultBob := o.Script("/Sample/token/getBalance",
		WithSigner("account"),
		WithArg("account", "bob"),
	).Result
	color.Green("Bob's GVT balance after distribution is")
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

	afterAccountGVTVault := o.Script("/Sample/sales/getGVTVaultBalance",
		WithSigner("account"),
	).Result
	color.Green("The ICO's GVT balance after distribution is: ")
	fmt.Println(afterAccountGVTVault)
}
