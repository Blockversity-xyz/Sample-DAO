# PurchaseToken Component Documentation

## Overview

The `PurchaseToken` component is a React functional component that allows users to purchase tokens. It uses the `useState` and `useEffect` hooks from React, and the `useNavigate` hook from `react-router-dom`. It also imports `getSaleInfo` and `purchaseBVT` from `../Flow/ICOActions`.

## State Variables

- `fromToken`: This state variable holds the value of the fiat token (USDC) that the user wants to swap for tokens. It is initialized as an empty string and updated through the `setFromToken` function.
- `tokenInfo`: This state variable holds the information about the token. It is initialized as an empty object and updated through the `setTokenInfo` function.

## useEffect Hook

The `useEffect` hook is used to fetch the token information when the component mounts. It calls the `getSaleInfo` function and updates the `tokenInfo` state variable with the returned information.

## handleSwap Function

The `handleSwap` function is an asynchronous function that handles the token purchase process. It logs a message, tries to purchase the tokens by calling the `purchaseBVT` function with the `fromToken` value, logs the transaction, resets the `fromToken` state variable to zero, displays a success message, and navigates to the `/create_proposal` route. If there is an error during the process, it logs the error and displays an error message.

## Render

The component renders a form that allows the user to enter the amount of fiat tokens they want to swap for tokens. It also displays the amount of tokens the user will receive for the entered amount of fiat tokens. The form includes a button that triggers the `handleSwap` function when clicked. After the purchase, a message is displayed instructing the user to add the governance token to their wallet.