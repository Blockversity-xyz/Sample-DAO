import React, { useState, useEffect } from "react";
import { getSaleInfo, getPurchasers } from "../../Flow/ICOActions";


const ICO: React.FC = () => {

  const [tokenInfo, setTokenInfo] = useState<any>({});
  const [purchasers, setPurchasers] = useState<string[]>([]);

  useEffect(() => {
    getSaleInfo().then((info) => {
      setTokenInfo(info);
    });
    getPurchasers().then((addresses) => {
      setPurchasers(addresses);
    });
  }, []);

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
            <h2 className="text-lg font-medium mb-2">TOTAL USERS</h2>
            <p className="text-3xl font-semibold">{purchasers.length}</p>
          </div>

          <div className="bg-gray-100 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-2">AMOUNT COLLECTED</h2>
            <p className="text-3xl font-semibold">{/* Add amount collected here */}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-2">Max Cap</h2>
            <p className="text-3xl font-semibold">{/* Add total amount here */}</p>
          </div>

          <div className="bg-gray-100 rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-2">SOLD</h2>
            <p className="text-3xl font-semibold">{/* Add sold amount here */}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICO;
