import { useState, useEffect } from "react";
import { depositBVT } from "../../Flow/ICOActions";

interface TokenFormData {
    maxSupply: number;
    totalSupply: number;
    mintGVT: number;
}

const CreateTokenForm = () => {
    const [formData, setFormData] = useState<TokenFormData>({
        maxSupply: 0,
        totalSupply: 0,
        mintGVT: 0,
    });

    useEffect(() => {
        // Simulating API call to fetch the maxSupply and totalSupply values
        fetchTokenData().then((data) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                maxSupply: data.maxSupply,
                totalSupply: data.totalSupply,
            }));
        });
    }, []);

    const fetchTokenData = async () => {
        // Simulating API call to retrieve token data from the backend
        return new Promise<{ maxSupply: number; totalSupply: number }>(
            (resolve) => {
                setTimeout(() => {
                    // Mocked data, replace with actual API response handling
                    resolve({ maxSupply: 600000000, totalSupply: 0 });
                }, 1000);
            }
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(formData);
            depositBVT(formData.mintGVT.toFixed(2));
            alert("Tokens Sent successfully!");
        } catch (error) {
            console.log(error);
            alert("Error setting proxy.");
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        const parsedValue = parseFloat(value);
        setFormData({ ...formData, [name]: parsedValue });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="maxSupply" className="block font-medium mb-2">
                    Max Supply
                </label>
                <div className="border rounded-md px-3 py-2">
                    {formData.maxSupply.toLocaleString()}
                </div>
            </div>
            <div>
                <label htmlFor="totalSupply" className="block font-medium mb-2">
                    Total Supply
                </label>
                <div className="border rounded-md px-3 py-2">
                    {formData.totalSupply.toLocaleString()}
                </div>
            </div>

            <div>
                <label htmlFor="mintGVT" className="block font-medium mb-2">
                    Mint GVT
                </label>
                <input
                    type="number"
                    name="mintGVT"
                    value={formData.mintGVT}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="col-span-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Mint
                </button>
            </div>
        </form>
    );
};

export default CreateTokenForm;
