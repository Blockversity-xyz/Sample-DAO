# SellTokensForm

`SellTokensForm` is a React component that provides a form for launching a new token sale. It uses the `useState` hook to manage the form data and the `launchToken` function from `ICOActions` to launch the token sale.

## Import

```jsx
import React, { useState } from 'react';
import { launchToken } from '../../Flow/ICOActions';
```


## State

- `formData`: An object that holds the form data. It includes the token name, symbol, maximum supply, total supply, minimum cap, maximum cap, start date, end date, token price, lockup, and minimum goal.

## useState

The `useState` hook is used to initialize the `formData` state variable with the `initialFormData` object.

## handleInputChange

The `handleInputChange` function is used to update the `formData` state variable when the user changes the value of a form input.

## handleSubmit

The `handleSubmit` function is used to handle the form submission. It prevents the default form submission behavior, logs the form data, and calls the `launchToken` function with the form data.

## Render

The component renders a form with inputs for the token name, symbol, maximum supply, total supply, minimum cap, maximum cap, start date, end date, token price, lockup, and minimum goal. The form data is bound to the form inputs using the `value` prop and the `onChange` prop.
