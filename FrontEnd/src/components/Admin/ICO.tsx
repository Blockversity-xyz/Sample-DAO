import React, { useState, useEffect } from "react";
import { getSaleInfo, getPurchasers, getFUSDBalance, getMaxCap, getMinCap } from "../../Flow/ICOActions";


const ICO: React.FC = () => {

  const [tokenInfo, setTokenInfo] = useState<any>({});
  const [purchasers, setPurchasers] = useState<string[]>([]);
  const [fusdBalance, setFUSDBalance] = useState<number>(0);
  const [getMaxCap, setMaxCap] = useState();
  const [getMinCap, setMinCap] = useState<number>(0);


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
  console.log(tokenInfo);

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
};

export default ICO;
