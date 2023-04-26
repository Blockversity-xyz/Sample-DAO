package main

import (
	"fmt"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
)

func main() {

	o := Overflow(

		WithNetwork("testnet"),
	)

	fmt.Println("Transfering Flow from Sample")
	fmt.Println("Press any key to continue")
	fmt.Scanln()

	/*
		Add an address to the Whitelist
	*/

	color.Green("Should be able to transfer Flow from the testnet account to an address")
	o.Script("Sample/token/getBalance",
		WithArg("account", "0x49a232bb31e5dd58")).Print()

	o.Tx(
		"./flow/transfer_Sample",
		WithSigner("Sample"),
		WithArg("amount", "100.0"),
		WithArg("recipient", "0x49a232bb31e5dd58"),
	).Print()

	color.Green("Should be able to transfer Flow from the testnet account to an address")
	o.Script("Sample/token/getBalance",
		WithArg("account", "0x49a232bb31e5dd58")).Print()
}
