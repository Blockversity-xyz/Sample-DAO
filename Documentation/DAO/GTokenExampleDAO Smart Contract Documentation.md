
## Overview

The `GTokenExampleDAO` smart contract is a Decentralized Autonomous Organization (DAO) contract that allows users to create proposals and vote on them. The contract is designed to work with fungible tokens (GToken) and non-fungible tokens (NFTs).

## Contract Variables

- `Proposals`: An array of Proposal objects.
- `votedRecords`: An array of records indicating who has voted.
- `totalProposals`: The total number of proposals.
- `tokensForProposal`: The number of tokens required to create a proposal.
- `ProposerStoragePath`, `VoterStoragePath`, `VoterPublicPath`, `VoterPath`: Paths for storing and accessing Proposer and Voter resources.

## Events

- `ContractInitialized`: Emitted when the contract is initialized.
- `ProposalCreated`: Emitted when a new proposal is created.
- `VoteSubmitted`: Emitted when a vote is submitted.

## Resources

### Proposer

The Proposer resource allows a user to create and update proposals. It has two public functions:

- `addProposal`: Creates a new proposal.
- `updateProposal`: Updates an existing proposal.

### Voter

The Voter resource allows a user to vote on proposals. It has three public functions:

- `vote`: Votes on a proposal.
- `getVotedOption`: Returns the option a user voted for in a specific proposal.
- `getVotedOptions`: Returns all the options a user has voted for.

## Structures

### Proposal

The Proposal structure represents a proposal. It has several public functions:

- `update`: Updates the proposal.
- `vote`: Votes on the proposal.
- `count`: Counts the votes for the proposal.
- `isEnded`: Checks if the voting period for the proposal has ended.
- `isStarted`: Checks if the voting period for the proposal has started.
- `getTotalVoted`: Returns the total number of votes for the proposal.

## Public Functions

- `getHoldedGVT`: Returns the balance of GToken held by a specific address.
- `getProposals`: Returns all the proposals.
- `getProposalsLength`: Returns the number of proposals.
- `getProposal`: Returns a specific proposal.
- `count`: Counts the votes for a specific proposal.
- `getVotedRecords`: Returns all the voting records.
- `initVoter`: Initializes a new Voter resource.

## Initialization

The contract is initialized with an empty array of proposals and voting records, a total proposal count of 0, and a token requirement for proposals of 10.0. It also sets up storage paths for the Proposer and Voter resources and saves instances of these resources in the contract's storage.