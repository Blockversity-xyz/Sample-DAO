import React, { useState } from 'react';
import { pause, unPause, refund, burnTokens, distribute } from '../../Flow/ICOActions';


interface TokenManagement {
    refund: boolean;
    freeze: boolean;
    distribute: boolean;
}

const initialFormValues: TokenManagement = {
    refund: false,
    freeze: false,
    distribute: false,
};


export default function ManageTokensForm() {
    const [formValues, setFormValues] = useState<TokenManagement>(initialFormValues);
    const [burn, setBurn] = useState<number>(0);

    const handleFreezeClick = () => {
        const confirmationMessage = `Are you sure you want to ${formValues.freeze ? 'unfreeze' : 'freeze'} this token?`;
        if (window.confirm(confirmationMessage)) {
            setFormValues({
                ...formValues,
                freeze: !formValues.freeze,
            });
        }
    };

    const handleDistributeClick = () => {
        if (window.confirm("Are you sure you want to distribute this token?")) {
            setFormValues({
                ...formValues,
                distribute: !formValues.distribute,
            });
            distribute();
        }
    };

    const handleRefundClick = () => {
        if (window.confirm('Are you sure you want to refund this token? This action is irreversible.')) {
            setFormValues({
                ...formValues,
                refund: !formValues.refund,
            });

        }
    };

    const handleBurnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (burn >= 0) {
            if (window.confirm("Are you sure you want to burn?")) {
                burnTokens(burn.toFixed(2));
                console.log('Burn submitted:', burn);
            }
        } else {
            console.log('Invalid burn value');
        }
    };

    const handleRefundSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        refund();
        console.log('Refund submitted');
    };

    const handleFreezeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formValues.freeze) {
            unPause();
            console.log('Unfreeze submitted');
        } else {
            pause();
            console.log('Freeze submitted');
        }
    };

    const handleDistributeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        distribute();

        console.log('Distribute submitted');
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <form onSubmit={handleRefundSubmit} className="flex justify-center items-center">
                <div className="flex flex-col">
                    <label htmlFor="refund">Refund</label>
                    <button
                        type="submit"
                        className={`mt-2 rounded-lg border-gray-400 border p-2 w-full ${formValues.refund ? 'bg-green-500 text-white' : ''}`}
                        disabled={formValues.refund} // Disable the button when formValues.refund is 'Refunded'
                        onClick={handleRefundClick}
                    >
                        {formValues.refund ? 'Refunded' : 'Refund'}
                    </button>
                </div>
            </form>

            <form onSubmit={handleBurnSubmit} className="flex justify-center items-center">
                <div className="flex flex-col">
                    <label htmlFor="burn" className="mt-4">
                        Burn
                    </label>
                    <input
                        type="number"
                        id="burn"
                        name="burn"
                        onChange={(event) => setBurn(Number(event.target.value))}
                        className="rounded-lg border-gray-400 border p-2 w-full mt-2"
                    />
                    <button
                        type="submit"
                        className="rounded-md border-gray-400 border w-20 bg-green-500 text-white"
                    >
                        Burn
                    </button>
                </div>
            </form>

            <form onSubmit={handleFreezeSubmit} className="flex justify-center items-center">
                <div className="flex flex-col">
                    <label>Freeze</label>
                    <button
                        type="submit"
                        className={`mt-2 rounded-lg border-gray-400 border p-2 w-full ${formValues.freeze ? 'bg-green-500 text-white' : ''
                            }`}
                        onClick={handleFreezeClick}
                    >
                        {formValues.freeze ? 'Frozen' : 'Not frozen'}
                    </button>
                </div>
            </form>

            <form onSubmit={handleDistributeSubmit} className="flex justify-center items-center">
                <div className="flex flex-col">
                    <label htmlFor="distribute" className="mt-4">
                        Distribute
                    </label>
                    <button
                        type="submit"
                        className={`mt-2 rounded-lg border-gray-400 border p-2 w-full ${formValues.distribute ? 'bg-green-500 text-white' : ''
                            }`}
                        disabled={formValues.distribute}
                        onClick={handleDistributeClick}
                    >
                        {formValues.distribute ? 'Distributed' : 'Not distributed'}
                    </button>
                </div>
            </form>
        </div>
    );

}
