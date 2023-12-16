import React, { useState } from 'react';
import { launchToken } from '../../Flow/ICOActions';

type SellTokensFormData = {
    tockenName: string;
    tokenSymbol: string;
    maxSupply: number;
    totalSupply: number;
    minCap: number;
    maxCap: number;
    startDate: Date;
    endDate: Date;
    tokenPrice: number;
    lockup: number;
    minimumGoal: number;

};

const initialFormData: SellTokensFormData = {
    tockenName: 'Governance Token',
    tokenSymbol: 'GVT',
    maxSupply: 1000000,
    totalSupply: 0,
    minCap: 100,
    maxCap: 100000,
    startDate: new Date(),
    endDate: new Date(),
    tokenPrice: 0.0010,
    lockup: 0,
    minimumGoal: 100000000,
};

export default function SellTokensForm() {
    const [formData, setFormData] = useState<SellTokensFormData>(initialFormData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        try {
            const start = (formData.startDate.getTime() / 1000).toFixed(2);
            const end = (formData.endDate.getTime() / 1000).toFixed(2);
            console.log(formData.tokenPrice);

            let launch = launchToken(formData.tockenName, formData.tokenSymbol, formData.minCap.toFixed(2), formData.maxCap.toFixed(2), start, end, formData.tokenPrice.toFixed(6), formData.minimumGoal.toFixed(2), formData.lockup.toFixed(2));
            console.log(launch);
            
        } catch (error) {
            console.log(error);
            alert('Error setting proxy.');
        }
    };

    return (

        <form className="w-full max-w-screen-xl mx-auto px-6 py-8" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                    <h2 className="text-2xl mb-2 font-medium">Token Info</h2>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tokenName">
                                Token Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tokenName"
                                type="string"
                                name="tokenName"
                                value={formData.tockenName}
                                onChange={(e) => setFormData({ ...formData, tockenName: e.target.value })} />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tokenSymbol">
                                Token Symbol
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tokenSymbol"
                                type="string"
                                name="tokenSymbol"
                                value={formData.tokenSymbol}
                                onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
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
                                onChange={(e) => setFormData({ ...formData, tokenPrice: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="text-lg mb-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lockup">
                                Lockup(Days)
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


