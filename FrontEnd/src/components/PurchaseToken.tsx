import React, { useState } from "react";

const PurchaseToken: React.FC = () => {
    const [fromToken, setFromToken] = useState("");
    const [toToken, setToToken] = useState("");
    const [amount, setAmount] = useState("");

    const handleSwap = () => {
        // Handle token swap logic here
        console.log("Swapping tokens...");
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white py-8 px-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Swap Tokens</h1>

            <div className="flex flex-col w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="fromToken" className="text-gray-600 mr-2">
                        From FUSD
                    </label>
                    <input
                        type="text"
                        id="fromToken"
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                        className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Amount"
                    />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="toToken" className="text-gray-600 mr-2">
                        To GVT
                    </label>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="amount" className="text-gray-600 mr-2">
                        Amount:
                    </label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter amount"
                    />
                </div>

                <button
                    onClick={handleSwap}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Swap
                </button>
            </div>
        </div>
    );
};

export default PurchaseToken;
