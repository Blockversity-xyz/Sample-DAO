/** @format */

//@ts-ignore
import * as fcl from "@onflow/fcl";
//import t from "@onflow/types";
import "./config";
import { Buffer } from "buffer/";

// ///////////////
// // Cadence code
// ///////////////

// // Scripts
import { getBVTBalance as getBVTBalanceScript } from "./Scripts/ICO/getBVT_Balance";
import { getFUSDVaultBalance as getFUSDVaultBalanceScript } from "./Scripts/ICO/getFUSDVaultBalance";
import { getIsSaleActive as getIsSaleActiveScript } from "./Scripts/ICO/getIsSaleActive";
import { getSaleInfo as getSaleInfoScript } from "./Scripts/ICO/getSaleInfo";
import { getPurchaseInfo as getPurchaseInfoScript } from "./Scripts/ICO/getPurchaseInfo";
import { getPurchasers as getPurchasersScript } from "./Scripts/ICO/getPurchasers";

// // Transactions
import { deployerTransactionCode } from "./Transactions/ICO/deployICO";
import { purchaseBVT as purchaseBVTTransaction } from "./Transactions/ICO/purchaseBVT";
import { depositBVT as depositBVTTransaction } from "./Transactions/ICO/Admin/depositBVT";
import { pause as pauseTransaction } from "./Transactions/ICO/Admin/pause";
import { unPause as unPauseTransaction } from "./Transactions/ICO/Admin/unpause";
import { refund as refundTransaction } from "./Transactions/ICO/Admin/refund";
import { distribute as distributeTransaction } from "./Transactions/ICO/Admin/distribute";
import { withdrawBVT as withdrawBVTTransaction } from "./Transactions/ICO/Admin/withdrawBVT";
import { setup_BVT as setup_BVTTransaction } from "./Transactions/ICO/setup_BVT";

// // ICO Contract Code
import { contractCode } from "./Transactions/ICO/contractCode";

export function replaceICOWithProperValues(
  tokenName: string,
  contractAddress: string
) {
  return contractCode()
    .replace('"../BlockVersityToken.cdc"', contractAddress)
    .replaceAll("BlockVersityToken", tokenName);
}

// // ****** Transactions Functions ****** //

// Deploy an ICO contract from the Admin board
export const deployICO = async (
  price: string,
  tokenAddress: string,
  tokenName: string
) => {
  const ICOCode = replaceICOWithProperValues(tokenName, tokenAddress);
  const hexCode = Buffer.from(ICOCode).toString("hex");
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: deployerTransactionCode(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg("ExamplePublicSale", t.String),
          arg(price, t.UFix64),
          // Contract Code
          arg(hexCode, t.String),
        ],
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

// Setup an account to receive BVT
export const setupBVT = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: setup_BVTTransaction(),
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

// Purchase BVT as a user
export const purchaseBVT = async (amount: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: purchaseBVTTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [arg(amount, t.UFix64)],
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

// Deposit BVT as an Admin
export const depositBVT = async (amount: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: depositBVTTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [arg(amount, t.UFix64)],
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

// Withdraw BVT as an Admin
export const withdrawBVT = async (amount: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: withdrawBVTTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [arg(amount, t.UFix64)],
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

// Refund FUSD to an address as an Admin
export const refund = async (address: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: refundTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [arg(address, t.Address)],
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

// Distribute allocated BVT to one Address as an Admin
export const distribute = async (address: string, allocationAmount: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: distributeTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg(address, t.Address),
          arg(allocationAmount, t.UFix64),
        ],
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

// Pause the public sale as an Admin
export const pause = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: pauseTransaction(),
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

// UnPause the public sale as an Admin
export const unPause = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: unPauseTransaction(),
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

// Get BVT Balance on the ICO smart contract.

export const getBVTBalance = async () => {
  try {
    const response = await fcl.query({
      cadence: getBVTBalanceScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Get FUSD Balance on the ICO smart contract.

export const getFUSDBalance = async () => {
  try {
    const response = await fcl.query({
      cadence: getFUSDVaultBalanceScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Check if sale is Active

export const getIsSaleActive = async () => {
  try {
    const response = await fcl.query({
      cadence: getIsSaleActiveScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Check ICO's general Info

export const getSaleInfo = async () => {
  try {
    const response = await fcl.query({
      cadence: getSaleInfoScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Check data on a purchase ticketId

export const getPurchaseInfo = async () => {
  try {
    const response = await fcl.query({
      cadence: getPurchaseInfoScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// Check data on a purchase ticketId

export const getPurchasers = async () => {
  try {
    const response = await fcl.query({
      cadence: getPurchasersScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};
