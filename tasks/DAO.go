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

	// Setup Bob with BVT
	color.Red("Should be able to setup Bob's account to receive BVT")
	o.Tx("BlockVersity/setup_account", WithSigner("bob"))
	color.Green("Pass")

	// Transfer 101 BVT to Bob from Account
	color.Red("Should be able to send 101 BVT to Bob")
	o.Tx("BlockVersity/transferBVT", WithSigner("account"), WithArg("amount", "101.0"), WithArg("recipient", "bob"))
	color.Green("Pass")

	// Bob deposits a ProposerProxy inside his account
	color.Red("Should be able setup a ProposerProxy inside Bob's account")
	o.Tx("DAO/setupProposerProxy", WithSigner("bob"))
	color.Green("Pass")

	// Admin deposits a Proposer resource inside Bob's account
	color.Red("Admin should be able deposit a Proposer resource inside Bob's account")
	o.Tx("DAO/depositProposer", WithSigner("account"), WithArg("proposerAddress", "bob"))
	color.Green("Pass")

	// Proposer creates a Proposal
	color.Red("Bob should be able to create a new Proposal")
	o.Tx("DAO/createProposal",
		WithSigner("bob"),
		WithArg("title", "How much $BVT tokens grant should the BlockVersity ecosystem fund allocate for war in Ukraine?"),
		WithArg("description", "BlockVersity is dedicated to stop the doomsday clock from moving any closer to midnight, at any cost."),
		WithArg("options", `["200K $BVT", "600K $BVT", "1000K $BVT"]`),
		WithArg("startAt", "1641373200.0"),
		WithArg("endAt", "1759546000.0"),
		WithArg("minHoldedBVTAmount", "100.0"),
	)
	color.Green("Pass")

	/*

	   // Create a Voter
	   color.Red("Should be able to create a Voter resource into the signer's account")
	   o.Tx("DAO/createVoter",

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
	*/
}
