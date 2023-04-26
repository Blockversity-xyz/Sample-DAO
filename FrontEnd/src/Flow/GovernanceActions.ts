/** @format */

//@ts-ignore
import * as fcl from "@onflow/fcl";
import "./config";

// ///////////////
// // Cadence code
// ///////////////

// Lifecycle FCL Auth functions
export const currentUser = () => fcl.currentUser();

// DAO Scripts
import { getProposals as getProposalsScript } from "./Scripts/DAO/getProposals";
import { getUserBalance as getUserBalanceScript } from "./Scripts/getGVT_Balance";

// // Transactions
import { setProxy as setProxyScript } from "./Transactions/DAO/createProposerProxy";
import { depositProposer as depositProposerScript } from "./Transactions/DAO/depositProposer";
import { createProposal as createProposalTransaction } from "./Transactions/DAO/createProposal";
import { vote as voteTransaction } from "./Transactions/DAO/vote";

// // ****** Transactions Functions ****** //

export const setProxy = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: setProxyScript(),
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

export const depositProposer = async (address: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: setProxyScript(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [arg(address, t.Address)],
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

export const vote = async (proposalId: number, optionIndex: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: voteTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg(proposalId, t.UInt64),
          arg(optionIndex, t.Int),
        ],
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

export const createProposal = async (
  title: string,
  description: string,
  options: string[],
  startAt: string, //changed to string
  endAt: string, //changed to string
  minHoldedGVTAmount: string //changed to string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: createProposalTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        args: (arg: any, t: any) => [
          arg(title, t.String),
          arg(description, t.String),
          arg(options, t.Array(t.String)),
          arg(startAt, t.UFix64),
          arg(endAt, t.UFix64),
          arg(minHoldedGVTAmount, t.UFix64),
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

// // ****** Script Functions ****** //

// Get all proposals on the DAO contract.

export const getUserBalance = async (account: string) => {
  try {
    const response = await fcl.query({
      cadence: getUserBalanceScript(),
      args: (arg: any, t: any) => [account, t.Address],
    });
    console.log(response, "CALLED IN THE BACKEND");
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getProposals = async () => {
  try {
    const response = await fcl.query({
      cadence: getProposalsScript(),
      args: (arg: any, t: any) => [],
    });
    console.log(response, "CALLED IN THE BACKEND");
    return response;
  } catch (e) {
    console.log(e);
  }
};
