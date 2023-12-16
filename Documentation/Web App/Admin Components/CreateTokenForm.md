# CreateTokenForm Component Documentation

## Overview

The `CreateTokenForm` component is a form that allows users to deposit GVT tokens to the sale. It fetches the maximum supply and total supply of tokens from the backend and calculates the tokens in circulation. The form also allows users to input the amount of GVT tokens they want to deposit.

## State

- `formData`: An object that holds the form data. It includes `maxSupply`, `totalSupply`, and `transferGVT`.
- `inCirculation`: The number of tokens in circulation.

## Functions

- `fetchTokenData`: A function that fetches the maximum supply of tokens from the backend. It returns a promise that resolves to an object with the `maxSupply` property.
- `handleSubmit`: A function that handles the form submission. It prevents the default form submission event, logs the form data, and calls the `depositBVT` function with the `transferGVT` value.
- `handleInputChange`: A function that handles the input change event. It updates the form data with the new input value.

## Usage

```jsx
<CreateTokenForm />
```

## Example

```jsx
import CreateTokenForm from './CreateTokenForm';

function App() {
 return (
   <div className="App">
     <CreateTokenForm />
   </div>
 );
}

export default App;
```

## Notes

- The `maxSupply` is set to 600,000,000 in the backend.
- The `transferGVT` value is rounded to two decimal places before being passed to the `depositBVT` function.
- The form does not validate the input values. It disallows negative values by setting the input value to 0 if the parsed value is less than 0.