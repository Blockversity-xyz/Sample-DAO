import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

type Tokenomics = {
    name: string;
    symbol: string;
    address: string;
    price: number;
    maxSupply: number;
    initialSupply: number;
};


const data = [
    { name: 'Burned Tokens', value: 20 },
    { name: 'Team Tokens', value: 20 },
    { name: 'Marketing Tokens', value: 10 },
    { name: 'Community Tokens', value: 50 },
];

const COLORS = ['#FF5C5C', '#FFC93C', '#1CB0F6', '#2ED47A'];

const TokenomicsForm = ({ tokenomics }: { tokenomics: Tokenomics }) => {
    return (
        <div className="flex justify-center">
            <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenomics.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {tokenomics.symbol}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenomics.price}
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
                                {tokenomics.address}
                            </h1>
                            <p className="text-sm text-gray-500">Address</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenomics.initialSupply}
                            </h1>
                            <p className="text-sm text-gray-500">Initial Supply</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tokenomics.maxSupply}
                            </h1>
                            <p className="text-sm text-gray-500">Max Supply</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Tokenomics
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                        <div className="flex flex-col">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    labelLine={false}
                                    label={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenomicsForm;


