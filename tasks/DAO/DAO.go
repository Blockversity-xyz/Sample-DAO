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

	// Setup Bob with ST
	color.Red("Should be able to setup Bob's account to receive ST")
	o.Tx("Sample/token/setup_account", WithSigner("bob"))
	color.Green("Pass")

	// Transfer 101 ST to Bob from Account
	color.Red("Should be able to send 101 ST to Bob")
	o.Tx("Sample/token/transferST", WithSigner("account"), WithArg("amount", "101.0"), WithArg("recipient", "bob"))
	color.Green("Pass")

	// Create a Proposer
	color.Red("Should be able to create a Proposer resource into an account")
	o.Tx("DAO/createProposer",
		WithSigner("account"))
	color.Green("Pass")

	// Create a Voter
	color.Red("Should be able to create a Voter resource into the signer's account")
	o.Tx("DAO/createVoter",
		WithSigner("bob"))
	color.Green("Pass")

	// Proposer creates a Topic
	color.Red("Account should be able to create a new Topic")
	o.Tx("DAO/createTopic",
		WithSigner("account"),
		WithArg("_title", "How much $ST tokens grant should the Sample ecosystem fund allocate for war in Ukraine?"),
		WithArg("_description", "Sample is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("_options", `["200K $ST", "600K $ST", "1000K $ST"]`),
		WithArg("_startAt", "1641373200.0"),
		WithArg("_endAt", "1759546000.0"),
		WithArg("_minHoldedSTAmount", "100.0"),
	)
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
	o.Script("DAO/getVoterOptions",
		WithArg("address", "account"))
	color.Green("Pass")

	// Anyone should be able to count votes on the contract
	color.Red("Alice should be able to count votes on a proposal")
	o.Script("DAO/countVotes",
		WithArg("ProposalId", "0"),
	)
	color.Green("Pass")

	// Anyone should be able to fetch a list of proposals from the DAO contract
	color.Red("Should be able to fetch a list of proposals")
	o.Script("DAO/getProposals")
	color.Green("Pass")

	// Count votes on proposal
	color.Red("Should be able to count votes on one proposal")
	o.Script("DAO/countVotes",
		WithArg("ProposalId", "0"))
	color.Green("Pass")

	// Fetch one proposal
	color.Red("Should be able to fetch a single proposal")
	o.Script("DAO/getProposal",
		WithArg("ProposalId", "0"))
	color.Green("Pass")

	// Fetch one proposal's votes
	color.Red("Should be able to fetch a proposal's Votes")
	o.Script("DAO/getProposalVotes",
		WithArg("ProposalId", "0"))
	color.Green("Pass")

	// Fetch one proposal's count
	color.Red("Should be able to fetch the number of total votes on one proposal")
	o.Script("DAO/getProposalTotalVoted",
		WithArg("ProposalId", "0"))
	color.Green("Pass")
}
