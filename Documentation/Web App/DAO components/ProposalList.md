# ProposalList Component Documentation

The `ProposalList` component is a React component that fetches and displays a list of proposals from a DAO (Decentralized Autonomous Organization) on the Flow blockchain. It also allows users to vote on these proposals.

## Import Statements

The component imports several dependencies:

- `useState` and `useEffect` from React for managing state and side effects.
- `format` from `date-fns` for formatting dates.
- `getProposals` and `vote` from `../../Flow/GovernanceActions` for interacting with the DAO.
- `getVotedRecords` from `../../Flow/ICOActions` for fetching vote records.

## Component State

The component maintains the following state:

- `showActiveProposals`: A boolean that determines whether to show active or past proposals.
- `proposalData`: An array of proposal objects.
- `votedRecords`: An array of vote records.

## Component Lifecycle

The `useEffect` hook is used to fetch proposal data and vote records when the component mounts. The `fetchData` and `fetchVotedRecords` functions are defined within the `useEffect` hook and are called immediately.

## Event Handlers

The component defines several event handlers:

- `handleOptionClick`: Handles the click event on a proposal option. It logs the clicked proposal ID and option index, and calls the `vote` function with the proposal ID and option index.
- `getVoteCount`: Returns the vote count for a given proposal ID and option index.
- `getVoteTotalCount`: Returns the total vote count for a given proposal ID and option index.
- `getIndividualVoteCounts`: Returns the individual vote counts for a given proposal ID and option index.

## Render Method

The component renders a table of proposals. The table includes columns for the proposal title, description, start date, end date, required tokens, and options. Each option is a button that, when clicked, triggers the `handleOptionClick` event handler.

The component also includes buttons to toggle between showing active and past proposals. The active proposals are those that have not yet ended, while the past proposals are those that have ended.

The component uses the `format` function from `date-fns` to format the start and end dates of the proposals.