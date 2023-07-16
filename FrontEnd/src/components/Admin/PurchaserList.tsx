import React, { useEffect, useState } from "react";
import { getPurchasers, getAllPurchases } from "../../Flow/ICOActions";

export default function PurchaseList() {
    const [purchasers, setPurchasers] = useState<string[]>([]);
    const [purchaseInfo, setPurchaseInfo] = useState<any>({});

    useEffect(() => {
        getPurchasers().then((addresses) => {
            setPurchasers(addresses);
        });

        getAllPurchases().then((info) => {
            setPurchaseInfo(info);
        });
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="px-4 pt-3 pb-4 flex flex-col text-black">
                <div className="flex-1">
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-slate-500 text-white">
                                <tr>
                                    <th className="py-2 px-4">Address</th>
                                    <th className="py-2 px-4">Amount</th>
                                    <th className="py-2 px-4">Refund Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-300">
                                {purchasers.map((address) => (
                                    <tr key={address} className="border-b border-gray-200">
                                        <td className="py-3 px-4">{address}</td>
                                        <td className="py-3 px-4">{purchaseInfo[address]?.amount}</td>
                                        <td className="py-3 px-4">{purchaseInfo[address]?.refundAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
