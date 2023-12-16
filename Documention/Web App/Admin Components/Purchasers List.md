# PurchaseList

`PurchaseList` is a React component that displays a list of purchases made during an ICO (Initial Coin Offering). It fetches the list of purchasers and their purchase information from the `ICOActions` module.

## Import

```jsx
import React, { useEffect, useState } from "react";
import { getPurchasers, getAllPurchases } from "../../Flow/ICOActions";
```


## State

- `purchasers`: An array of strings that holds the addresses of the purchasers.
- `purchaseInfo`: An object that holds the purchase information for each purchaser.

## useEffect

The `useEffect` hook is used to fetch the list of purchasers and their purchase information when the component mounts. The `getPurchasers` and `getAllPurchases` functions from `ICOActions` are used to fetch this data.

## Render

The component renders a table that displays the address, amount, and refund amount for each purchaser. The data for the table is fetched from the `purchasers` and `purchaseInfo` state variables.
