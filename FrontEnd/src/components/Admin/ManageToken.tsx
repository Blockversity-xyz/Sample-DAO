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


export default function ManageTokensForm() {
    const [formValues, setFormValues] = useState<TokenManagement>(initialFormValues);

    const handleFreezeClick = () => {
        if (window.confirm("Are you sure you want to freeze this token? This action is irreversible.")) {
            setFormValues({
                ...formValues,
                freeze: !formValues.freeze,
            });
        }
    };

    const handleDistributeClick = () => {
        setFormValues({
            ...formValues,
            distribute: !formValues.distribute,
        });
    };

    const handleRefundClick = () => {
        if (window.confirm('Are you sure you want to refund?')) {
            setFormValues({
                ...formValues,
                refund: !formValues.refund,
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);
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
            </div>
        </form>
    );
}
