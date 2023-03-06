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

	// Bob votes
	color.Red("Bob tries to Vote on a proposal without the voter resource")
	o.Tx("DAO/vote",
		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertFailure(t, "Signer is not a Voter")
	color.Green("Pass")

	// Create a Voter
	color.Red("Should be able to create a Voter resource into the signer's account")
	o.Tx("DAO/createVoter",
		WithSigner("bob")).AssertSuccess(t).Print()
	color.Green("Pass")

	// Bob votes
	color.Red("Bob tries to Vote on a proposal but doesn't hold enough BVT")
	o.Tx("DAO/vote",
		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertFailure(t, "Could not borrow Balance reference to the Vault")
	color.Green("Pass")

	// Setup Bob with BVT
	color.Red("Should be able to setup Bob's account to receive BVT")
	o.Tx("BlockVersity/setup_account", WithSigner("bob"))
	color.Green("Pass")

	// Transfer 101 BVT to Bob from Account
	color.Red("Should be able to send 101 BVT to Bob")
	o.Tx("BlockVersity/transferBVT", WithSigner("account"), WithArg("amount", "101.0"), WithArg("recipient", "bob"))
	color.Green("Pass")

	color.Red("Bob should be able to vote on Proposal now")
	o.Tx("DAO/vote",
		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertSuccess(t)
	color.Green("Pass")

	// Account votes
	color.Red("Account should be able to Vote on a proposal")
	o.Tx("DAO/vote",
		WithSigner("account"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertSuccess(t)
	color.Green("Pass")

	color.Red("Should be able to fetch Voter's voted options")
	o.Script("DAO/getVoterOptions",
		WithArg("address", "account")).Print()
	color.Green("Pass")

	// Anyone should be able to count votes on the contract
	color.Red("Alice should be able to count votes on a proposal")
	o.Script("DAO/countVotes",
		WithArg("ProposalId", "0"),
	).Print()
	color.Green("Pass")

	// Anyone should be able to fetch a list of proposals from the DAO contract
	color.Red("Should be able to fetch a list of proposals")
	o.Script("DAO/getProposals").Print()
	color.Green("Pass")

	// Count votes on proposal
	color.Red("Should be able to count votes on one proposal")
	o.Script("DAO/countVotes",
		WithArg("ProposalId", "0")).Print()
	color.Green("Pass")

	// Fetch one proposal
	color.Red("Should be able to fetch a single proposal")
	o.Script("DAO/getProposal",
		WithArg("ProposalId", "0")).Print()
	color.Green("Pass")

	// Fetch one proposal's count
	color.Red("Should be able to fetch the number of total votes on one proposal")
	o.Script("DAO/getProposalTotalVoted",
		WithArg("ProposalId", "0")).Print()
	color.Green("Pass")
}
