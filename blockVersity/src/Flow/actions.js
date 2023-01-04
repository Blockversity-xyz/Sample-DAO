
import * as fcl from "@onflow/fcl";
import './config';

// Lifecycle FCL Auth functions
export const logOut = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();
export const currentUser = () => fcl.currentUser()

// // Transactions

import { signWhitelist as signWhitelistTransaction } from './Transactions/sign_Whitelist';

// // ****** Transactions Functions ****** //

export const signWhitelist = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: signWhitelistTransaction(),
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        authorizations: [fcl.currentUser],
        limit: 500
      });
      const transaction = await fcl.tx(transactionId).onceSealed()
      console.log(transaction)
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
}