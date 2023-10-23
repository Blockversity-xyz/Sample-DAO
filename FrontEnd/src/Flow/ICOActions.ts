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
import { getGVTPublicSaleBalance as getGVTBalanceScript } from "./Scripts/ICO/getGVTPublicSaleBalance";
import { getFUSDVaultBalance as getFUSDVaultBalanceScript } from "./Scripts/ICO/getFUSDVaultBalance";
import { getFUSDVaultStatus as getFUSDVaultStatusScript } from "./Scripts/ICO/getFUSDVaultStatus";
import { getIsSaleActive as getIsSaleActiveScript } from "./Scripts/ICO/getIsSaleActive";
import { getSaleInfo as getSaleInfoScript } from "./Scripts/ICO/getSaleInfo";
import { getPurchaseInfo as getPurchaseInfoScript } from "./Scripts/ICO/getPurchaseInfo";
import { getPurchasers as getPurchasersScript } from "./Scripts/ICO/getPurchasers";
import { getGovToken as getGtoken } from "./Scripts/ICO/getGovToken";
import { getAllPurchases as getAllPurchaseScript } from "./Scripts/ICO/getAllPurchases";
import { getMaxCap as getMax } from "./Scripts/ICO/getMaxCap";
import { getMinCap as getMin } from "./Scripts/ICO/getMinCap";
import { getVotedRecords as getRecords } from "./Scripts/DAO/getVotedRecords";

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
import { burnTokens as burn } from "./Transactions/ICO/Admin/burnTokens";
import { setup_fusd as setup_f } from "./Transactions/ICO/setup_fusd";
import { setup_USDC as vault_usdc } from "./Transactions/ICO/setup_USDC";
import { addAdmin as setAddAdmin } from "./Transactions/ICO/Admin/LaunchICO/addAdmin";
import { launchToken as launchTokenScript } from "./Transactions/ICO/Admin/LaunchICO/launchToken";
import { getFUSD as getFUSDScript } from "./Transactions/ICO/test/getFUSD";


// // ICO Contract Code
import { contractCode } from "./Transactions/ICO/contractCode";

export function replaceICOWithProperValues(
  tokenName: string,
) {
  return contractCode()
    .replaceAll("FiatToken", tokenName);
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
      alert("ICO Launched");
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
      resolve('Operation completed successfully');
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
export const burnTokens = async (
  amount: string //changed to string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: burn(),
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
) => {
  const ICOCode = contractCode();
  const hexCode = Buffer.from(ICOCode).toString("hex");
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: deployerTransactionCode(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg("FiatToken", t.String), // contractName
          arg(hexCode, t.String), // code
          arg({ domain: "storage", identifier: "FVaultStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "FVaultBalancePubPath" }, t.Path),
          arg({ domain: "public", identifier: "FVaultUUIDPubPath" }, t.Path),
          arg({ domain: "public", identifier: "FVaultReceiverPubPath" }, t.Path),
          arg({ domain: "storage", identifier: "BlocklistExecutorStoragePath" }, t.Path),
          arg({ domain: "storage", identifier: "BlocklisterStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "BlocklisterCapReceiverPubPath" }, t.Path),
          arg({ domain: "public", identifier: "BlocklisterUUIDPubPath" }, t.Path),
          arg({ domain: "public", identifier: "BlocklisterPubSigner" }, t.Path),
          arg({ domain: "storage", identifier: "PauseExecutorStoragePath" }, t.Path),
          arg({ domain: "storage", identifier: "PauserStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "PauserCapReceiverPubPath" }, t.Path),
          arg({ domain: "public", identifier: "PauserUUIDPubPath" }, t.Path),
          arg({ domain: "public", identifier: "PauserPubSigner" }, t.Path),
          arg({ domain: "storage", identifier: "AdminExecutorStoragePath" }, t.Path),
          arg({ domain: "storage", identifier: "AdminStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "AdminCapReceiverPubPath" }, t.Path),
          arg({ domain: "public", identifier: "AdminUUIDPubPath" }, t.Path),
          arg({ domain: "public", identifier: "AdminPubSigner" }, t.Path),
          arg({ domain: "storage", identifier: "OwnerExecutorStoragePath" }, t.Path),
          arg({ domain: "storage", identifier: "OwnerStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "OwnerCapReceiverPubPath" }, t.Path),
          arg({ domain: "public", identifier: "OwnerUUIDPubPath" }, t.Path),
          arg({ domain: "public", identifier: "OwnerPubSigner" }, t.Path),
          arg({ domain: "storage", identifier: "MasterMinterExecutorStoragePath" }, t.Path),
          arg({ domain: "storage", identifier: "MasterMinterStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "MasterMinterCapReceiverPubPath" }, t.Path),
          arg({ domain: "public", identifier: "MasterMinterPubSigner" }, t.Path),
          arg({ domain: "public", identifier: "MasterMinterUUIDPubPath" }, t.Path),
          arg({ domain: "storage", identifier: "MinterControllerStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "MinterControllerUUIDPubPath" }, t.Path),
          arg({ domain: "public", identifier: "MinterControllerPubSigner" }, t.Path),
          arg({ domain: "storage", identifier: "MinterStoragePath" }, t.Path),
          arg({ domain: "public", identifier: "MinterUUIDPubPath" }, t.Path),
          arg({ domain: "private", identifier: "initialAdminCapabilityPrivPath" }, t.Path),
          arg({ domain: "private", identifier: "initialOwnerCapabilityPrivPath" }, t.Path),
          arg({ domain: "private", identifier: "initialMasterMinterCapabilityPrivPath" }, t.Path),
          arg({ domain: "private", identifier: "initialPauserCapabilityPrivPath" }, t.Path),
          arg({ domain: "private", identifier: "initialBlocklisterCapabilityPrivPath" }, t.Path),
          arg("Usdc", t.String), // tokenName
          arg("1.0", t.String), // version
          arg("1000000000.0", t.UFix64), // initTotalSupply
          arg(false, t.Bool), // initPaused
          arg(["648f9a2fbce3390bf5aeb6eaefd15ac93c81c11d845fef94e25d81789080f3ef2390f1c03651d48228f5d6509a1d7cde8e7d9606c26cc37985078e8234abb349"], t.Array(t.String)), // ownerAccountPubKeys
          arg(["2.0"], t.Array(t.UFix64)), // ownerAccountKeyWeights
          arg([2], t.Array(t.UInt8)), // ownerAccountKeyAlgos
          arg(["648f9a2fbce3390bf5aeb6eaefd15ac93c81c11d845fef94e25d81789080f3ef2390f1c03651d48228f5d6509a1d7cde8e7d9606c26cc37985078e8234abb349"], t.Array(t.String)), // adminAccountPubKeys
          arg(["2.0"], t.Array(t.UFix64)), // adminAccountKeyWeights
          arg([2], t.Array(t.UInt8)), // adminAccountKeyAlgos
          arg(["648f9a2fbce3390bf5aeb6eaefd15ac93c81c11d845fef94e25d81789080f3ef2390f1c03651d48228f5d6509a1d7cde8e7d9606c26cc37985078e8234abb349"], t.Array(t.String)), // masterMinterAccountPubKeys
          arg(["2.0"], t.Array(t.UFix64)), // masterMinterAccountKeyWeights
          arg([2], t.Array(t.UInt8)), // masterMinterAccountKeyAlgos
          arg(["648f9a2fbce3390bf5aeb6eaefd15ac93c81c11d845fef94e25d81789080f3ef2390f1c03651d48228f5d6509a1d7cde8e7d9606c26cc37985078e8234abb349"], t.Array(t.String)), // masterMinterAccountPubKeys
          arg(["2.0"], t.Array(t.UFix64)), // masterMinterAccountKeyWeights
          arg([2], t.Array(t.UInt8)), // masterMinterAccountKeyAlgos
          arg(["648f9a2fbce3390bf5aeb6eaefd15ac93c81c11d845fef94e25d81789080f3ef2390f1c03651d48228f5d6509a1d7cde8e7d9606c26cc37985078e8234abb349"], t.Array(t.String)), // masterMinterAccountPubKeys
          arg(["2.0"], t.Array(t.UFix64)), // masterMinterAccountKeyWeights
          arg([2], t.Array(t.UInt8)), // masterMinterAccountKeyAlgos
        ],
        limit: 1000,
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
      resolve('Operation completed successfully');
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

export const setup_USDC = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: vault_usdc(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg(["648f9a2fbce3390bf5aeb6eaefd15ac93c81c11d845fef94e25d81789080f3ef2390f1c03651d48228f5d6509a1d7cde8e7d9606c26cc37985078e8234abb349"], t.Array(t.String)), // multiSigPubKeys
          arg(["2.0"], t.Array(t.UFix64)), // multiSigKeyWeights
          arg([2], t.Array(t.UInt8)), // multiSigAlgos
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
      resolve('Operation completed successfully'); 
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
      
      resolve('Operation completed successfully');

      alert("GVT Token Transfered to the Sale Contract");
      window.location.reload();
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
};

// Withdraw GVT as an Admin
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
export const refund = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: refundTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 500,
      });
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log(transaction);// The transactions status and events after being sealed
      resolve('Operation completed successfully'); 
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
};

// Distribute allocated GVT to one Address as an Admin
export const distribute = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: distributeTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 500,
      });
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log(transaction); // The transactions status and events after being sealed
      resolve('Operation completed successfully');
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

export const getGVTPublicSaleBalance = async () => {
  try {
    const response = await fcl.query({
      cadence: getGVTBalanceScript(),
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

export const getGovToken = async () => {
  try {
    const response = await fcl.query({
      cadence: getGtoken(),
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

export const getAllPurchases = async () => {
  try {
    const response = await fcl.query({
      cadence: getAllPurchaseScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};


export const getMaxCap = async () => {
  try {
    const response = await fcl.query({
      cadence: getMax(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};



export const getMinCap = async () => {
  try {
    const response = await fcl.query({
      cadence: getMin(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};


export const getVotedRecords= async () => {
  try {
    const response = await fcl.query({
      cadence: getRecords(),
      args: (arg: any, t: any) => [],
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};