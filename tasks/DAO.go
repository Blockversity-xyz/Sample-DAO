package main

import (
	"fmt"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
)

/*
	- Admin deploys contract
	- Admin creates a proposer resource into someone’s account
	- Check if a user is a proposer
	- The proposer user creates a Proposal
	- Check that the proposal is on the DAO
	- Anyone who holds a certain amount of tokens can vote on the proposal
	- Display proposal result.
	- Anyone should be able to fetch a list of active proposals and their details
*/

func main() {

	o := Overflow(
		WithGlobalPrintOptions(),
	)

	fmt.Println("Creating a Story for the DAO")
	fmt.Println("Press any key to continue")
	fmt.Scanln()

	// Setup Bob with GVT
	color.Red("Should be able to setup Bob's account to receive GVT")
	o.Tx("GovernanceToken/setup_account", WithSigner("bob"))
	color.Green("Pass")

	// Transfer 101 GVT to Bob from Account
	color.Red("Should be able to send 101 GVT to Bob")
	o.Tx("GovernanceToken/transferGVT", WithSigner("account"), WithArg("amount", "101.0"), WithArg("recipient", "bob"))
	color.Green("Pass")

	// Bob deposits a ProposerProxy inside his account
	color.Red("Should be able setup a ProposerProxy inside Bob's account")
	o.Tx("DAO/setup/setupProposerProxy", WithSigner("bob"))
	color.Green("Pass")

	// Admin deposits a Proposer resource inside Bob's account
	color.Red("Admin should be able deposit a Proposer resource inside Bob's account")
	o.Tx("DAO/setup/depositProposer", WithSigner("account"), WithArg("proposerAddress", "bob"))
	color.Green("Pass")

	// Proposer creates a Proposal
	color.Red("Bob should be able to create a new Proposal")
	o.Tx("DAO/createProposal",
		WithSigner("bob"),
		WithArg("title", "How much $GVT tokens grant should the ExampleDAO ecosystem fund allocate for war in Ukraine?"),
		WithArg("description", "ExampleDAO is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("options", `["200K $GVT", "600K $GVT", "1000K $GVT"]`),
		WithArg("startAt", "1641373200.0"),
		WithArg("endAt", "1759546000.0"),
		WithArg("minHoldedGVTAmount", "100.0"),
	)
	color.Green("Pass")

	// Create a Voter
	color.Red("Should be able to create a Voter resource into the signer's account")
	o.Tx("DAO/setup/createVoter",

		WithSigner("bob"))

	color.Green("Pass")

	// Account votes
	color.Red("Account should be able to Vote on a proposal")
	o.Tx("DAO/vote",

		WithSigner("account"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	)
	color.Green("Pass")

	// Bob votes
	color.Red("Bob should be able to Vote on a proposal")
	o.Tx("DAO/vote",

		WithSigner("bob"),
		WithArg("ProposalId", "0"),
		WithArg("OptionIndex", "1"),
	)
	color.Green("Pass")

	// Should be able to fetch Voter's voted options
	color.Red("Should be able to fetch Voter's voted options")
	o.Script("getVoterOptions",

		WithArg("address", "account"))

	color.Green("Pass")

	// Anyone should be able to count votes on the contract
	color.Red("Alice should be able to count votes on a proposal")
	o.Script("countVotes",

		WithArg("ProposalId", "0"),
	)
	color.Green("Pass")

	// Anyone should be able to fetch a list of proposals from the DAO contract
	color.Red("Should be able to fetch a list of proposals")
	o.Script("getProposals")
	color.Green("Pass")

	// Count votes on proposal
	color.Red("Should be able to count votes on one proposal")
	o.Script("countVotes",

		WithArg("ProposalId", "0"))

	color.Green("Pass")

	// Fetch one proposal
	color.Red("Should be able to fetch a single proposal")
	o.Script("getProposal",

		WithArg("ProposalId", "0"))

	color.Green("Pass")

	// Fetch one proposal's count
	color.Red("Should be able to fetch the number of total votes on one proposal")
	o.Script("getProposalTotalVoted",

		WithArg("ProposalId", "0"))

	color.Green("Pass")

}
