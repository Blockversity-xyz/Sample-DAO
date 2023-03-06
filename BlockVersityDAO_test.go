package main

import (
	"fmt"
	"testing"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
	"github.com/stretchr/testify/assert"
)

func TestProposers(t *testing.T) {

	o, err := OverflowTesting()
	assert.NoError(t, err)

	fmt.Println("Testing Proposer creation and interactions")
	fmt.Println("Press any key to continue")
	fmt.Scanln()
	/*
		- Bob deposits a ProposerProxy inside his account
		- Bob attempts to make a Proposal without the Proposer resource
		- Admin deposits a Proposer resource inside Bob's account
		- Bob creates a Proposal
	*/
	color.Red("Should be able setup a ProposerProxy inside Bob's account")
	o.Tx("DAO/setupProposerProxy",
		WithSigner("bob")).AssertSuccess(t).Print()
	color.Green("Pass")

	color.Red("Bob will attempt to make a proposal with the Proxy, but fails")
	o.Tx("DAO/createProposal",
		WithSigner("bob"),
		WithArg("title", "How much $BVT tokens grant should the BlockVersity ecosystem fund allocate in support for Ukraine?"),
		WithArg("description", "BlockVersity is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("options", `["200K $BVT", "600K $BVT", "1000K $BVT"]`),
		WithArg("startAt", "1641373200.0"),
		WithArg("endAt", "1759546000.0"),
		WithArg("minHoldedBVTAmount", "100.0"),
	).AssertFailure(t, "unexpectedly found nil while forcing an Optional value")
	color.Green("Pass")

	color.Red("Admin should be able deposit a Proposer resource inside Bob's account")
	o.Tx("DAO/depositProposer",
		WithSigner("account"),
		WithArg("proposerAddress", "bob"),
	).AssertSuccess(t).Print()
	color.Green("Pass")

	color.Red("Bob will attempt to make a proposal again, and succeeds")
	o.Tx("DAO/createProposal",
		WithSigner("bob"),
		WithArg("title", "How much $BVT tokens grant should the BlockVersity ecosystem fund allocate in support for Ukraine?"),
		WithArg("description", "BlockVersity is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("options", `["200K $BVT", "600K $BVT", "1000K $BVT"]`),
		WithArg("startAt", "1641373200.0"),
		WithArg("endAt", "1759546000.0"),
		WithArg("minHoldedBVTAmount", "100.0"),
	).AssertSuccess(t).Print()
	color.Green("Pass")
}
