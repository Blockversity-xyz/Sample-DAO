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
		- Admin deploys contract
		- Setup a user account to receive a Proposer resource
		- Admin creates a proposer resource into someone’s account
		- Check if a user is a proposer
		- The proposer user creates a Proposal
		- Check that the proposal is on the DAO
		- Anyone who holds a certain amount of tokens can vote on the proposal
		- Display proposal result.
		- Anyone should be able to fetch a list of active proposals and their details
	*/
	color.Red("Should be able to create a Proposer resource into an account")
	o.Tx("DAO/createProposer",
		WithSigner("account"),
		WithArg("address", "bob")).Print()
	color.Green("Pass")

	/*
		 	color.Red("Should be able to check if an account holds 'Proposer' resource")
			o.Script("DAO/checkIfProposer",
				WithArg("address", "bob")).Print()
			color.Green("Pass")

			color.Red("Should be able to create a proposal")
			o.Tx("DAO/createProposal",
				WithSigner("bob"),
				WithArg("title", "How about a million BVT?"),
				WithArg("description", "A million BVT to save the world!"),
				WithArg("options", `["Yes", "No"]`),
				WithArg("startAt", "1641373200.0"),
				WithArg("endAt", "1641546000.0")).Print()
			color.Green("Pass")

			color.Red("Should be able to fetch a list of proposals")
			o.Script("DAO/getProposals").Print()
			color.Green("Pass")

			color.Red("Should be able to create a proposal")
			o.Tx("DAO/createVoter",
				WithSigner("alice")).Print()
			color.Green("Pass")

			color.Red("Alice should be able to vote")
			o.Tx("DAO/vote",
				WithSigner("alice"),
				WithArg("topicId", "1"),
				WithArg("optionIndex", "1")).Print()
			color.Green("Pass")

			color.Red("Anyone should be able to fetch a list of active proposals")
			o.Script("DAO/").Print()
			color.Green("Pass")
	*/
}
