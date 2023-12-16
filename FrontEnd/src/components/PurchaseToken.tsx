import React, { useState, useEffect } from "react";
import { getSaleInfo, purchaseBVT } from "../Flow/ICOActions";
import { useNavigate } from "react-router-dom";

const PurchaseToken: React.FC = () => {
    const [fromToken, setFromToken] = useState("");
    let navigate = useNavigate();

    const [tokenInfo, setTokenInfo] = useState<any>({});

    useEffect(() => {
        getSaleInfo().then((info) => {
            setTokenInfo(info);
        });
    }, []);

    const handleSwap = async () => {
        console.log("Swapping tokens...");

        try {
            const tx = await purchaseBVT(parseFloat(fromToken).toFixed(2));
            console.log(tx);
            // Reset the fields to zero

            // Display success message
            alert(
                "You now own GVTs, the governance token. You are ready to set up a proposal."
            );
            setFromToken("0");
            // Navigate to the proposals page
            navigate("/create_proposal");

        } catch (error) {
            console.log(error);
            alert("Error purchasing tokens.");
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
                            Value in FiatToken (USDC)
                        </label>
                        <input
                            type="string"
                            id="fromToken"
                            value={fromToken}
                            onChange={(e) => setFromToken(e.target.value)}
                            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Amount"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="toToken" className="text-gray-600 mr-2">
                            You will get GVT
                        </label>
                        {parseFloat(fromToken) / tokenInfo.tokenPrice}
                    </div>

                    <button
                        onClick={handleSwap}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Buy
                    </button>
                </div>
                <p className="text-center mt-10">
                    Add the governance token to your wallet so that you can vote or create proposals.
                    You do this by swapping USDC to GVT.
                </p>
            </div>
        </div>
    );
};

export default PurchaseToken;
