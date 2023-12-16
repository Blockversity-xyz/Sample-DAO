# AdminDashboard Component

The `AdminDashboard` component is a functional component in React that serves as the main dashboard for the admin user. It provides a set of functionalities for managing the token, launching an ICO, managing the token, viewing ICO details, viewing tokenomics, and viewing the list of purchasers.

## Importing Dependencies

The component imports `React` and `useState` from the `react` library. It also imports several other components: `CreateToken`, `SellToken`, `ManageToken`, `ICO`, `Tokennomics`, and `PurchaserList`.

## Component State

The component maintains two pieces of state: `activeTab` and `isManageAccountActive`. `activeTab` is used to keep track of the currently active tab, while `isManageAccountActive` is a boolean that determines whether the "Manage Account" section is active or not.

## Handlers

The component defines two handler functions: `handleTabClick` and `toggleSections`. `handleTabClick` is used to set the `activeTab` state when a tab is clicked. `toggleSections` is used to toggle the `isManageAccountActive` state when the "Dashboard" or "Manage Account" button is clicked.

## Rendering

The component renders a div with several buttons for navigating between different sections. The active tab is highlighted with a different color. Depending on the `activeTab` state, one of the imported components (`CreateToken`, `SellToken`, `ManageToken`, `ICO`, `Tokennomics`, or `PurchaserList`) is rendered.

## Exporting

The component is exported as the default export of the module.

## Usage

This component should be used in the main application component where the admin user is expected to interact with the token management functionalities.