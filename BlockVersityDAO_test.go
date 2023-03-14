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
	o.Tx("DAO/setup/setupProposerProxy",
		WithSigner("bob")).AssertSuccess(t).Print()

	color.Red("Bob will attempt to make a proposal with the Proxy, but fails")
	o.Tx("DAO/createProposal",
		WithSigner("bob"),
		WithArg("title", "How much $GVT tokens grant should the ExampleDAO ecosystem fund allocate in support for Ukraine?"),
		WithArg("description", "ExampleDAO is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("options", `["200K $GVT", "600K $GVT", "1000K $GVT"]`),
		WithArg("startAt", "1641373200.0"),
		WithArg("endAt", "1759546000.0"),
		WithArg("minHoldedGVTAmount", "100.0"),
	).AssertFailure(t, "unexpectedly found nil while forcing an Optional value").Print()

	color.Red("Admin should be able deposit a Proposer resource inside Bob's account")
	o.Tx("DAO/setup/depositProposer",
		WithSigner("account"),
		WithArg("proposerAddress", "bob"),
	).AssertSuccess(t).Print()

	color.Red("Bob will attempt to make a proposal again, and succeeds")
	o.Tx("DAO/createProposal",
		WithSigner("bob"),
		WithArg("title", "How much $GVT tokens grant should the ExampleDAO ecosystem fund allocate in support for Ukraine?"),
		WithArg("description", "ExampleDAO is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("options", `["200K $GVT", "600K $GVT", "1000K $GVT"]`),
		WithArg("startAt", "1641373200.0"),
		WithArg("endAt", "1759546000.0"),
		WithArg("minHoldedGVTAmount", "100.0"),
	).AssertSuccess(t).Print()

	// Bob votes
	color.Red("Bob tries to Vote on a proposal without the voter resource")
	o.Tx("DAO/vote",
		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertFailure(t, "Signer is not a Voter")

	// Create a Voter
	color.Red("Should be able to create a Voter resource into the signer's account")
	o.Tx("DAO/setup/createVoter",
		WithSigner("bob")).AssertSuccess(t).Print()

	// Bob attempts to vote without enough GVT
	color.Red("Bob tries to Vote on a proposal but doesn't hold enough GVT")
	o.Tx("DAO/vote",
		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertFailure(t, "Could not borrow Balance reference to the Vault")

	// Setup Bob with GVT
	color.Red("Should be able to setup Bob's account to receive GVT")
	o.Tx("GovernanceToken/setup_account", WithSigner("bob")).Print()

	// Transfer 101 GVT to Bob from Account
	color.Red("Should be able to send 101 GVT to Bob")
	o.Tx("GovernanceToken/transferGVT", WithSigner("account"), WithArg("amount", "101.0"), WithArg("recipient", "bob")).Print()

	color.Red("Bob should be able to vote on Proposal now")
	o.Tx("DAO/vote",
		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertSuccess(t)

	// Account votes
	color.Red("Account should be able to Vote on a proposal")
	o.Tx("DAO/vote",
		WithSigner("account"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	).AssertSuccess(t)

	color.Red("Should be able to fetch Voter's voted options")
	o.Script("getVoterOptions",
		WithArg("address", "account")).Print()

	// Anyone should be able to count votes on the contract
	color.Red("Alice should be able to count votes on a proposal")
	o.Script("countVotes",
		WithArg("ProposalId", "0"),
	).Print()

	// Anyone should be able to fetch a list of proposals from the DAO contract
	color.Red("Should be able to fetch a list of proposals")
	o.Script("getProposals").Print()

	// Count votes on proposal
	color.Red("Should be able to count votes on one proposal")
	o.Script("countVotes",
		WithArg("ProposalId", "0")).Print()

	// Fetch one proposal
	color.Red("Should be able to fetch a single proposal")
	o.Script("getProposal",
		WithArg("ProposalId", "0")).Print()

	// Fetch one proposal's count
	color.Red("Should be able to fetch the number of total votes on one proposal")
	o.Script("getProposalTotalVoted",
		WithArg("ProposalId", "0")).Print()
}
