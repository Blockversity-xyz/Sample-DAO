import React, { useState, useEffect } from "react";
import { getSaleInfo, getPurchasers, getMaxCap } from "../../Flow/ICOActions";


const TokenomicsForm = () => {
    const [tokenInfo, setTokenInfo] = useState<any>({});
    const [purchasers, setPurchasers] = useState<string[]>([]);
    const [maxCap, setMaxCap] = useState<number>(0);

    useEffect(() => {
        getSaleInfo().then((info) => {
            setTokenInfo(info);
        });
        getPurchasers().then((addresses) => {
            setPurchasers(addresses);
        });
        getMaxCap().then((maxCap) => {
            setMaxCap(maxCap);
        }
        );
    }, []);
    return (
        <div className="flex justify-center">
            <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenInfo.tokenName}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {tokenInfo.tokenSymbol}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenInfo.tokenPrice}
                            </h1>
                            <p className="text-sm text-gray-500">Price</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8">

                        <div className="flex flex-col">

                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {/* equal to max cap */}
                                Max Cap
                            </h1>
                            <p className="text-sm text-gray-500">{maxCap}</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenInfo.tokenSupply}
                            </h1>
                            <p className="text-sm text-gray-500">Max Supply</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenomicsForm;


