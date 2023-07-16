import React, { useState, useEffect } from "react";
import { depositBVT, getGovToken } from "../../Flow/ICOActions";

interface TokenFormData {
    maxSupply: number;
    totalSupply: number;
    transferGVT: number;
}

const CreateTokenForm = () => {
    const [formData, setFormData] = useState<TokenFormData>({
        maxSupply: 0,
        totalSupply: 0,
        transferGVT: 0,
    });

    const [inCirculation, setInCirculation] = useState<number>(0);


    useEffect(() => {
        // Simulating API call to fetch the maxSupply value
        fetchTokenData().then((data) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                maxSupply: data.maxSupply,
            }));
        });

        // Fetch totalSupply value
        getGovToken().then((data) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                totalSupply: data,
            }));
        });

        setInCirculation((formData.maxSupply - formData.totalSupply));
    }, []);

    const fetchTokenData = async () => {
        // In the backend maxSupply is 600,000,000
        return new Promise<{ maxSupply: number }>((resolve) => {
            setTimeout(() => {
                resolve({ maxSupply: 600000000 });
            }, 10);
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(formData);
            depositBVT(formData.transferGVT.toFixed(2));
        } catch (error) {
            console.log(error);
            alert("Error Sending Tokens.");
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        const parsedValue = parseFloat(value);

        // Validate the input value to disallow negative values
        const inputValue = parsedValue >= 0 ? parsedValue : 0;

        setFormData({ ...formData, [name]: inputValue });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="maxSupply" className="block font-medium mb-2">
                    Max Supply
                </label>
                <div className="border rounded-md px-3 py-2">{formData.maxSupply}</div>
            </div>
            <div>
                <label htmlFor="totalSupply" className="block font-medium mb-2">
                    In Circulation
                </label>
                <div className="border rounded-md px-3 py-2">{formData.maxSupply - formData.totalSupply}</div>
            </div>

            <div>
                <label htmlFor="transferGVT" className="block font-medium mb-2">
                    Deposit GVT to Sale
                </label>
                <input
                    type="number"
                    name="transferGVT"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="col-span-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Transfer
                </button>
            </div>
        </form>
    );
};

export default CreateTokenForm;
