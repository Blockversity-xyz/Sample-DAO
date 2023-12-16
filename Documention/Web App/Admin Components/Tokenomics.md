# TokenomicsForm

`TokenomicsForm` is a React component that displays the tokenomics information of a token sale. It fetches the token information, the list of purchasers, and the maximum cap from the `ICOActions` module.

## Import

```jsx
import React, { useState, useEffect } from "react";
import { getSaleInfo, getPurchasers, getMaxCap } from "../../Flow/ICOActions";
```


## State

- `tokenInfo`: An object that holds the token information.
- `purchasers`: An array of strings that holds the addresses of the purchasers.
- `maxCap`: A number that holds the maximum cap of the token sale.

## useEffect

The `useEffect` hook is used to fetch the token information, the list of purchasers, and the maximum cap when the component mounts. The `getSaleInfo`, `getPurchasers`, and `getMaxCap` functions from `ICOActions` are used to fetch this data.

## Render

The component renders a form that displays the token name, token symbol, token price, maximum cap, and maximum supply. The data for the form is fetched from the `tokenInfo` and `maxCap` state variables.
