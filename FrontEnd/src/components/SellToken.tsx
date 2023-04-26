import React, { useState } from 'react';

type SellTokensFormData = {
    maxSupply: number;
    totalSupply: number;
    minCap: number;
    maxCap: number;
    startDate: Date;
    endDate: Date;
    tokenPrice: number;
    lockup: number;
};

const initialFormData: SellTokensFormData = {
    maxSupply: 1000000,
    totalSupply: 0,
    minCap: 100,
    maxCap: 100000,
    startDate: new Date(),
    endDate: new Date(),
    tokenPrice: 1,
    lockup: 0,
};

export default function SellTokensForm() {
    const [formData, setFormData] = useState<SellTokensFormData>(initialFormData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target;
        const value = target.type;
        const name = target.name;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    };

    return (

        <form className="w-full max-w-screen-xl mx-auto px-6 py-8" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
                    <h2 className="text-2xl mb-2 font-medium">Token Supply</h2>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="maxSupply">
                                Max Supply
                            </label>
                            <div>
                                {initialFormData.maxSupply}
                            </div>
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalSupply">
                                Total Supply
                            </label>
                            <div>
                                {initialFormData.totalSupply}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
                    <h2 className="text-2xl mb-2 font-medium">Token Sale</h2>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="minCap">
                                Min Cap
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="minCap"
                                type="number"
                                name="minCap"
                                value={formData.minCap}
                                onChange={(e) => setFormData({ ...formData, minCap: parseInt(e.target.value) })} />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="maxCap">
                                Max Cap
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="maxCap"
                                type="number"
                                name="maxCap"
                                value={formData.maxCap}
                                onChange={(e) => setFormData({ ...formData, maxCap: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="startDate">
                                Start Date
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="startDate"
                                type="date"
                                name="startDate"
                                value={formData.startDate.toISOString().slice(0, 10)}
                                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                            />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="endDate">
                                End Date
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="endDate"
                                type="date"
                                name="endDate"
                                value={formData.endDate.toISOString().slice(0, 10)}
                                onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                            />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tokenPrice">
                                Token Price
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tokenPrice"
                                type="number"
                                name="tokenPrice"
                                value={formData.tokenPrice}
                                onChange={(e) => setFormData({ ...formData, tokenPrice: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lockup">
                                Lockup
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="lockup"
                                type="number"
                                name="lockup"
                                value={formData.lockup}
                                onChange={(e) => setFormData({ ...formData, lockup: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Launch
                </button>
            </div>
        </form>
    )
}


