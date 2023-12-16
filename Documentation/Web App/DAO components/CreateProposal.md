# Documentation for the CreateProposal Component

The `CreateProposal` component is a form that allows users to create a proposal in the DAO. It uses React's `useState` hook to manage the state of the form fields and the `useNavigate` hook from `react-router-dom` to navigate to the proposal page after a proposal is created.

```jsx
import { useState} from "react";
import { createProposal } from "../../Flow/GovernanceActions";
import { useNavigate } from "react-router-dom";

interface Props {
 onSubmit: (
   title: string,
   description: string,
   options: string[],
   startAt: Date,
   endAt: Date,
   minHoldedGVTAmount: number
 ) => void;
}

export default function CreateProposal({ onSubmit }: Props) {
 // ...
}
```

## Props

The `CreateProposal` component accepts a single prop:

- `onSubmit`: A function that is called when the form is submitted. It receives the following parameters:
 - `title`: The title of the proposal.
 - `description`: The description of the proposal.
 - `options`: An array of options for the proposal.
 - `startAt`: The start date of the proposal.
 - `endAt`: The end date of the proposal.
 - `minHoldedGVTAmount`: The minimum amount of GVT tokens required to vote or create a proposal.

## State

The component uses the `useState` hook to manage the state of the form fields:

- `title`: The title of the proposal.
- `description`: The description of the proposal.
- `options`: An array of options for the proposal.
- `startAt`: The start date of the proposal.
- `endAt`: The end date of the proposal.
- `minHoldedGVTAmount`: The minimum amount of GVT tokens required to vote or create a proposal.

## Handlers

The component defines several handlers:

- `handleOptionChange`: This handler is called when an option is changed. It updates the corresponding option in the `options` state.
- `handleAddOption`: This handler is called when the "+" button is clicked. It adds a new option to the `options` state.
- `handleSubmit`: This handler is called when the form is submitted. It prevents the default form submission, creates a proposal using the `createProposal` function, calls the `onSubmit` prop, and navigates to the proposal page.

## Render

The component renders a form with fields for the title, description, options, start date, end date, and minimum GVT amount. It also includes a "+" button to add more options and a "Create" button to submit the form.