/** @format */

//@ts-ignore
import * as fcl from "@onflow/fcl";
//import t from "@onflow/types";
import "./config";

// ///////////////
// // Cadence code
// ///////////////

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();
export const currentUser = () => fcl.currentUser();

// // AllowList Scripts
import { getAllAddresses as getAllAddressesScript } from "./Scripts/get_all_addresses";
import { getUserTimestamp as getUserTimestampScript } from "./Scripts/get_user_timestamp";

// ICO Scripts
import { getBVTBalance as getBVTBalanceScript } from "./Scripts/ICO/getBVT_Balance";
import { getFUSDVaultBalance as getFUSDVaultBalanceScript } from "./Scripts/ICO/getFUSDVaultBalance";
import { getIsSaleActive as getIsSaleActiveScript } from "./Scripts/ICO/getIsSaleActive";
import { getPurchaseInfo as getPurchaseInfoScript } from "./Scripts/ICO/getPurchaseInfo";
import { getPurchasers as getPurchasersScript } from "./Scripts/ICO/getPurchasers";

// // Transactions

import { signWhitelist as signWhitelistTransaction } from "./Transactions/sign_Whitelist";

// // ****** Transactions Functions ****** //

export const signWhitelist = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: signWhitelistTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 500,
      });
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log(transaction); // The transactions status and events after being sealed
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
};

// // ****** Script Functions ****** //

// Get a Owned NFTs from connected account.

export const getAllAddresses = async () => {
  try {
    const response = await fcl.query({
      cadence: getAllAddressesScript(),
      args: (arg: any, t: any) => [],
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getUserTimestamp = async (userAddress: any) => {
  try {
    const response = await fcl.query({
      cadence: getUserTimestampScript(),
      args: (arg: any, t: any) => [arg(userAddress, t.Address)],
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};
