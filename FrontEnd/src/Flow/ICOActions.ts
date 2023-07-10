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
import { getFUSDVaultStatus as getFUSDVaultStatusScript } from "./Scripts/ICO/getFUSDVaultStatus";
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
import { setup_GVT as setup_BVTTransaction } from "./Transactions/ICO/setup_GVT";
import { setTokenAdmin as setAdmin } from "./Transactions/ICO/setTokenAdmin";
import { newMinter as newMinterGVT } from "./Transactions/ICO/Admin/newMinter";
import { mintGVT as mint } from "./Transactions/ICO/Admin/mintGVT";
import { setup_fusd as setup_f } from "./Transactions/ICO/setup_fusd";
import { addAdmin as setAddAdmin } from "./Transactions/ICO/Admin/LaunchICO/addAdmin";
import { launchToken as launchTokenScript } from "./Transactions/ICO/Admin/LaunchICO/launchToken";
import { getFUSD as getFUSDScript } from "./Transactions/ICO/test/getFUSD";


// // ICO Contract Code
import { contractCode } from "./Transactions/ICO/contractCode";

export function replaceICOWithProperValues(
  tokenName: string,
  contractAddress: string
) {
  return contractCode()
    .replace('"../GovernanceToken.cdc"', contractAddress)
    .replaceAll("GovernanceToken", tokenName);
}

// // ****** Transactions Functions ****** //

// get FUSD tokens for testing
export const getFUSD = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: getFUSDScript(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [],
        limit: 500,
      });
      const transaction = await fcl.tx(transactionId).onceSealed();
      resolve(transaction);
    } catch (error) {
      reject(error);
    }
  });
};



// get admin resource


export const launchToken = async (
  name: string,
  symbol: string,
  minCap: string,
  maxCap: string, //changed to string
  start: string, //changed to string
  end: string,
  price: string, //changed to string
  goal: string, //changed to string
  lockup: string //changed to string

) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: launchTokenScript(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg(name, t.String),
          arg(symbol, t.String),
          arg(minCap, t.UFix64),
          arg(maxCap, t.UFix64),
          arg(start, t.UFix64),
          arg(end, t.UFix64),
          arg(price, t.UFix64),
          arg(goal, t.UFix64),
          arg(lockup, t.UFix64),
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


// launch token
export const addAdmin = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: setAddAdmin(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [],
        limit: 500,
      });
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log(transaction); // The transactions status and events after being sealed
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};



// create new minter for the Governance Token contract
export const newMinter = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: newMinterGVT(),
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

// 
export const mintGVT = async (
  amount: string //changed to string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: mint(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg(amount, t.UFix64),
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
// Become an Admin of the Governance Token contract

export const setTokenAdmin = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: setAdmin(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [],
        limit: 1000,
      });
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log(transaction); // The transactions status and events after being sealed
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};
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
export const setup_GVT = async () => {
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

export const setup_fusd = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: setup_f(),
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


// Get FUSD Balance on user account.



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

// get FUSD Vault Status
export const getFUSDVaultStatus = async () => {
  try {
    const response = await fcl.query({
      cadence: getFUSDVaultStatusScript(),
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
