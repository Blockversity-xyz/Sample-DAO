import React, { useState, useEffect } from "react";
import { getFUSD, getSaleInfo, purchaseBVT } from "../Flow/ICOActions";
import { set } from "date-fns";

const PurchaseToken: React.FC = () => {
    const [fromToken, setFromToken] = useState(0.0);
    const [toToken, setToToken] = useState("");
    const [amount, setAmount] = useState("");

    const [tokenInfo, setTokenInfo] = useState<any>({});

    useEffect(() => {
        getSaleInfo().then((info) => {
            setTokenInfo(info);
        });
    }, []);

    const handleSwap = () => {
        // Handle token swap logic here
        console.log("Swapping tokens...");

        // Validate if fromToken is a valid number
        if (isNaN(fromToken)) {
            console.log("Please enter a valid number for fromToken.");
            return;
        }

        try {
            purchaseBVT(parseFloat(fromToken).toFixed(2)).then((tx) => {
                console.log(tx);
            });
        } catch (error) {
            console.log(error);
        }

        console.log("Tokens swapped!");
    };


    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center bg-white py-8 px-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Buy Tokens</h1>
                <div className="flex flex-col w-full max-w-md">
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="fromToken" className="text-gray-600 mr-2">
                            Value in FUSD
                        </label>
                        <input
                            type="number"
                            id="fromToken"
                            value={fromToken}
                            onChange={(e) => setFromToken(e.target.value)}
                            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Amount"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="toToken" className="text-gray-600 mr-2">
                            you will get GVT
                        </label>
                        {(parseInt(fromToken) * tokenInfo.tokenPrice)}
                    </div>

                    <button
                        onClick={handleSwap}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseToken;
