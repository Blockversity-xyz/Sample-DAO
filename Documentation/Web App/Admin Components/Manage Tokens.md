# ManageTokensForm

`ManageTokensForm` is a React component that provides a form for managing tokens in an ICO (Initial Coin Offering). It allows users to perform actions such as refunding, burning, freezing, and distributing tokens.

## Import

```jsx
import React, { useState } from 'react';
import { pause, unPause, refund, burnTokens, distribute } from '../../Flow/ICOActions';
```


## State

- `formValues`: An object that holds the state of the form. It has three properties: `refund`, `freeze`, and `distribute`, all of which are booleans.
- `burn`: A number that holds the amount of tokens to be burned.

## Methods

- `handleFreezeClick`: Toggles the `freeze` state and calls the `pause` or `unPause` function from `ICOActions` depending on the current state.
- `handleDistributeClick`: Toggles the `distribute` state and calls the `distribute` function from `ICOActions`.
- `handleRefundClick`: Toggles the `refund` state.
- `handleBurnSubmit`: Calls the `burnTokens` function from `ICOActions` with the `burn` state as an argument.
- `handleRefundSubmit`: Calls the `refund` function from `ICOActions`.
- `handleFreezeSubmit`: Calls the `pause` or `unPause` function from `ICOActions` depending on the current state.
- `handleDistributeSubmit`: Calls the `distribute` function from `ICOActions`.

## Render

The component renders a form with four buttons: Refund, Burn, Freeze, and Distribute. Each button has an associated submit handler that performs the corresponding action when the button is clicked. The state of each button is displayed on the button itself.
