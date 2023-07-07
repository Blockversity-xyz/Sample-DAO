import React from "react";

type Purchase = {
    id: string;
    purchaser: string;
    wallet: string;
    tokens: number;
    value: number;
    paymentReceived: boolean;
    tokensDistributed: boolean;
};

const recentPurchases: Purchase[] = [
    {
        id: "1",
        purchaser: "John Doe",
        wallet: "0x1234",
        tokens: 1000,
        value: 100,
        paymentReceived: true,
        tokensDistributed: true,
    },
    // ...
];

export default function PurchaseList() {
    const purchases = recentPurchases;

    return (
        <div className="flex justify-center items-center">
            <div className="px-4 pt-3 pb-4 flex flex-col text-black">
                <div className="flex-1">
                    <div>
                        <table className="w-full" style={{ tableLayout: "fixed" }}>
                            <thead className="border border-gray-200 rounded-full my-3 custom-thead">
                                <tr>
                                    <th>ID</th>
                                    <th>PURCHASER</th>
                                    <th>WALLET</th>
                                    <th>#TOKENS</th>
                                    <th>VALUE</th>
                                    <th>PAYMENT RECEIVED</th>
                                    <th>TOKENS DISTRIBUTED</th>
                                </tr>
                            </thead>
                            <tbody className="border border-gray-200 bg-slate-500 rounded-sm mt-3 text-center">
                                {purchases.map((purchase: Purchase) => (
                                    <tr key={purchase.id}>
                                        <td>#{purchase.id}</td>
                                        <td>{purchase.purchaser}</td>
                                        <td>{purchase.wallet}</td>
                                        <td>{purchase.tokens}</td>
                                        <td>${purchase.value}</td>
                                        <td>{purchase.paymentReceived ? "Yes" : "No"}</td>
                                        <td>{purchase.tokensDistributed ? "Yes" : "No"}</td>
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
