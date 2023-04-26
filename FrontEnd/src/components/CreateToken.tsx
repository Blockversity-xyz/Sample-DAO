/** @format */

import { useState } from "react";

interface TokenFormData {
    name: string;
    symbol: string;
    address: string;
    maxSupply: number;
    totalSupply: number;
    tokenPrice: number;
}

const CreateTokenForm = () => {
    const [formData, setFormData] = useState<TokenFormData>({
        name: '',
        symbol: '',
        address: '',
        maxSupply: 0,
        totalSupply: 0,
        tokenPrice: 0,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        // Here you can handle the submission of the form, for example,
        // sending the data to a server to create a new token.


    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    return (<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
            <label htmlFor="name" className="block font-medium mb-2">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor="symbol" className="block font-medium mb-2">Symbol</label>
            <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor="address" className="block font-medium mb-2">Address</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor="maxSupply" className="block font-medium mb-2">Max Supply</label>
            <input
                type="number"
                name="maxSupply"
                value={formData.maxSupply}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor="totalSupply" className="block font-medium mb-2">Total Supply</label>
            <input
                type="number"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor="tokenPrice" className="block font-medium mb-2">Token Price</label>
            <input
                type="number"
                name="tokenPrice"
                value={formData.tokenPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div className="col-span-2">
            <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create Token
            </button>
        </div>
    </form>
    );
};

export default CreateTokenForm;
