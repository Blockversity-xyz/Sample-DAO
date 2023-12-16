# ICO Component Documentation

The `ICO` component is a functional component in React that displays information about an Initial Coin Offering (ICO). It uses several hooks and functions to fetch and display data.

## Imports

The component imports `React`, `useState`, and `useEffect` from the `react` library. It also imports several functions from the `ICOActions` module.

```jsx
import React, { useState, useEffect } from "react";
import { getSaleInfo, getPurchasers, getFUSDBalance, getMaxCap, getMinCap } from "../../Flow/ICOActions";
```

## State Variables

The component uses the `useState` hook to declare several state variables:

- `tokenInfo`: An object that stores information about the token being sold in the ICO.
- `purchasers`: An array that stores the addresses of all purchasers.
- `fusdBalance`: A number that stores the total amount of FUSD (a stablecoin) collected in the ICO.
- `getMaxCap`: A function that fetches the maximum cap of the ICO.
- `getMinCap`: A function that fetches the minimum cap of the ICO.

```jsx
const [tokenInfo, setTokenInfo] = useState<any>({});
const [purchasers, setPurchasers] = useState<string[]>([]);
const [fusdBalance, setFUSDBalance] = useState<number>(0);
const [getMaxCap, setMaxCap] = useState();
const [getMinCap, setMinCap] = useState<number>(0);
```

## useEffect Hook

The `useEffect` hook is used to fetch data when the component mounts. It calls the `getSaleInfo`, `getPurchasers`, and `getFUSDBalance` functions, and updates the corresponding state variables with the returned data.

```jsx
useEffect(() => {
 getSaleInfo().then((info) => {
   setTokenInfo(info);
 });
 getPurchasers().then((addresses) => {
   setPurchasers(addresses);
 });
 getFUSDBalance().then((balance) => {
   setFUSDBalance(balance);
 });
}, []);
```

## Render Method

The `render` method returns a JSX element that displays the ICO information. It includes the token name, total number of purchasers, total amount collected, and lockup period.

```jsx
return (
 <div className="flex justify-center">
   <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 mt-8">
     <div className="flex justify-between items-center mb-4">
       <h1 className="text-2xl font-bold">ICO Dashboard</h1>
     </div>

     <div className="grid grid-cols-3 gap-4 mb-4">
       <div className="bg-gray-100 rounded-lg shadow p-4">
         <h2 className="text-lg font-medium mb-2">TOKEN SALE</h2>
         <p className="text-3xl font-semibold">{tokenInfo.tokenName}</p>
       </div>

       <div className="bg-gray-100 rounded-lg shadow p-4">
         <h2 className="text-lg font-medium mb-2">TOTAL PURCHASERS</h2>
         <p className="text-3xl font-semibold">{purchasers.length}</p>
       </div>

       <div className="bg-gray-100 rounded-lg shadow p-4">
         <h2 className="text-lg font-medium mb-2">AMOUNT COLLECTED</h2>
         <p className="text-3xl font-semibold">{fusdBalance}</p>
       </div>
     </div>

     <div className="grid grid-cols-2 gap-4">
       <div className="bg-gray-100 rounded-lg shadow p-4">
         <h2 className="text-lg font-medium mb-2">LockUp</h2>
         <p className="text-3xl font-semibold">{tokenInfo.Lockup}</p>
       </div>
     </div>
   </div>
 </div>
);
```

## Export

The `ICO` component is exported as the default export of the module.

```jsx
export default ICO;
```
