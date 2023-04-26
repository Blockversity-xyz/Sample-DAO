import React, { useState } from 'react';

interface TokenManagement {
    refund: boolean;
    burn: number;
    freeze: boolean;
    distribute: boolean;
}

interface Contract {
    name: string;
    address: string;
}

const initialFormValues: TokenManagement = {
    refund: false,
    burn: 0,
    freeze: false,
    distribute: false,
};

const initialContractList: Contract[] = [
    {
        name: 'Contract 1',
        address: '0x1234567890123456789012345678901234567890',
    },
    {
        name: 'Contract 2',
        address: '0x0987654321098765432109876543210987654321',
    },
];

export default function ManageTokensForm() {
    const [formValues, setFormValues] = useState<TokenManagement>(initialFormValues);
    const [selectedContract, setSelectedContract] = useState<Contract>(initialContractList[0]);
    const [contractList, setContractList] = useState<Contract[]>(initialContractList);

    const handleFreezeClick = () => {
        setFormValues({
            ...formValues,
            freeze: !formValues.freeze,
        });
    };

    const handleDistributeClick = () => {
        setFormValues({
            ...formValues,
            distribute: !formValues.distribute,
        });
    };

    const handleRefundClick = () => {
        setFormValues({
            ...formValues,
            refund: !formValues.refund,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);
    };

    const handleContractSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAddress = event.target.value;
        const selectedContract = contractList.find((contract) => contract.address === selectedAddress);
        if (selectedContract) {
            setSelectedContract(selectedContract);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-screen-md">
                <div className="flex flex-col">

                    <label htmlFor="refund">Refund</label>
                    <button
                        type="button"
                        className={`mt-2 rounded-lg border-gray-400 border p-2 w-full ${formValues.refund ? 'bg-green-500 text-white' : ''
                            }`}
                        onClick={handleRefundClick}
                    >
                        {formValues.refund ? 'Refunded' : 'Refund'}
                    </button>

                    <label htmlFor="burn" className="mt-4">
                        Burn
                    </label>
                    <input
                        type="number"
                        id="burn"
                        name="burn"
                        value={formValues.burn}
                        onChange={(event) =>
                            setFormValues({ ...formValues, burn: Number(event.target.value) })
                        }
                        className="rounded-lg border-gray-400 border p-2 w-full mt-2"
                    />
                    <button
                        type="submit"
                        className="rounded-md border-gray-400 border w-20 bg-green-500 text-white"
                    >
                        Burn
                    </button>
                </div>
                <div className="flex flex-col">
                    <label>Freeze</label>
                    <button
                        type="button"
                        className={`mt-2 rounded-lg border-gray-400 border p-2 w-full ${formValues.freeze ? 'bg-green-500 text-white' : ''
                            }`}
                        onClick={handleFreezeClick}
                    >
                        {formValues.freeze ? 'Frozen' : 'Not frozen'}
                    </button>
                    <label htmlFor="distribute" className="mt-4">
                        Distribute
                    </label>
                    <button
                        type="button"
                        className={`mt-2 rounded-lg border-gray-400 border p-2 w-full ${formValues.distribute ? 'bg-green-500 text-white' : ''
                            }`}
                        onClick={handleDistributeClick}
                    >
                        {formValues.distribute ? 'Distributed' : 'Not distributed'}
                    </button>
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="contract">Contract</label>
                    <select
                        id="contract"
                        name="contract"
                        value={selectedContract.address}
                        onChange={handleContractSelect}
                        className="rounded-lg border-gray-400 border p-2 w-full mt-2"
                    >
                        {contractList.map((contract) => (
                            <option key={contract.address} value={contract.address}>
                                {contract.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end col-span-2">

                </div>
            </div>
        </form>
    );
}
