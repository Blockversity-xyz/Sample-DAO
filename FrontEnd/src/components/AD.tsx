/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getBVTBalance,
    getFUSDBalance,
    getIsSaleActive,
    getPurchasers,
    setupBVT,
    deployICO,
    depositBVT,
    pause,
    unPause,
    withdrawBVT,
    refund,
    distribute,
} from "../Flow/ICOActions";

import tokenomics from "./Tokenomics";

interface InputProps {
    placeholder: string;
    name: string;
    type: string;
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => void;
}

const AdminDashboard: React.FC = () => {
    const [addressDistribute, setAddressDistribute] = useState("");
    const [addressRefund, setAddressRefund] = useState("");
    const [allocation, setAllocation] = useState(0);
    const [tokenName, setTokenName] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");
    const [price, setPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [fUSDBalance, setFUSDBalance] = useState(0);
    const [tokenSalePaused, setTokenSalePaused] = useState(true);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getBVTBalance().then((_balance) => setTokenBalance(_balance));
        getFUSDBalance().then((_balance) => setFUSDBalance(_balance));
        getIsSaleActive().then((boolean) => setTokenSalePaused(!boolean));
        getPurchasers().then((addresses) => {
            setAddresses(addresses);
        });
    }, []);

    const showAddresses = () => {
        setToggle(!toggle);
    };

    const handlePriceChange = (value: number) => {
        setPrice(value);
    };

    const handleDeposit = async () => {
        const response = await depositBVT(depositAmount.toFixed(1));
        console.log(response);
        // logic to deposit BVT and update BVT balance
    };

    const handleWithdraw = async () => {
        const response = await withdrawBVT(withdrawAmount.toFixed(1));
        console.log(response);
        // logic to withdraw BVT and update BVT balance
    };

    const handlePauseTokenSale = () => {
        if (tokenSalePaused) {
            unPause();
        } else {
            pause();
        }
    };

    const handlePurchasers = async () => {
        const response = await getPurchasers();
        console.log(response);
    };

    const handleLaunch = async () => {
        const response = await deployICO(price.toFixed(1), tokenAddress, tokenName);
        console.log(response);
    };

    const handleDistribute = async () => {
        distribute(addressDistribute, allocation.toFixed(1));
    };
    const handleRefund = async () => {
        refund(addressDistribute);
    };
    const handleAllocationChange = (value: number) => {
        setAllocation(value);
    };

    return (
        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center text-white blue-glassmorphism'>
                <Link to='/'>
                    <button
                        type='button'
                        className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'>
                        Back to Home
                    </button>
                </Link>
                <div className='bg-dark-blue-500  p-8'>
                    <p className='text-white text-xl mb-4'>Admin Dashboard</p>
                    <div className='flex mb-4'>
                        <div className='w-1/2'>
                            <div className='text-white mb-2'>Price ($ FUSD)</div>
                            <input
                                type='range'
                                min={0}
                                max={500}
                                value={price}
                                onChange={(e) => handlePriceChange(Number(e.target.value))}
                                className='w-full'
                            />

                            <input
                                type='text'
                                placeholder='Token Name'
                                className='w-full text-black mb-4'
                                value={tokenName}
                                onChange={(e) => setTokenName(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Token Address'
                                className='w-full text-black mb-4'
                                value={tokenAddress}
                                onChange={(e) => setTokenAddress(e.target.value)}
                            />
                            <button
                                className='border-pink border-4 rounded-full p-2'
                                onClick={() => handleLaunch()}>
                                Launch ICO
                            </button>
                        </div>
                        <div className='w-1/2 text-white'>{price} FUSD</div>
                    </div>

                    <div className='mb-4'>
                        <h2 className='text-center mb-4'>BVT Current Sale Price {salePrice}</h2>
                        <div className='text-white mb-2 text-center'>
                            BVT in ICO contract Balance
                        </div>
                        <div className='text-white text-center'>{tokenBalance}</div>
                    </div>
                    <div className='mb-4'>
                        <div className='text-white mb-2 text-center'>FUSD in ICO Balance</div>
                        <div className='text-white text-center'>{fUSDBalance}</div>
                    </div>
                    <div className='mb-4'>
                        <input
                            type='number'
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(Number(e.target.value))}
                            placeholder='Amount to deposit'
                            className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
                        />
                        <button
                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
                            onClick={handleDeposit}>
                            Deposit BVT
                        </button>
                    </div>
                    <div className='mb-4'>
                        <input
                            type='number'
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                            placeholder='Amount to withdraw'
                            className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
                        />
                        <button
                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
                            onClick={handleWithdraw}>
                            Withdraw BVT
                        </button>
                    </div>
                    <div className='mb-4'>
                        <button
                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
                            onClick={handlePauseTokenSale}>
                            {tokenSalePaused ? "UnFreeze" : "Freeze"} Token Sale
                        </button>
                    </div>
                    <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                        <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center text-white blue-glassmorphism'>
                            <input
                                placeholder='Address To'
                                name='addressTo'
                                value={addressDistribute}
                                onChange={(e) => setAddressDistribute(e.target.value)}
                                className='text-black'
                            />
                            <div className='text-white mb-2'>Allocation Percentage ($BVT)</div>
                            <input
                                type='range'
                                min={0}
                                max={100}
                                value={allocation}
                                onChange={(e) => handleAllocationChange(Number(e.target.value))}
                                className='w-full'
                            />
                            <div className='w-1/2 text-white'>{allocation}%</div>

                            <button
                                type='button'
                                onClick={handleDistribute}
                                className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'>
                                Distribute
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                        <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center text-white blue-glassmorphism'>
                            <input
                                placeholder='Address to Refund'
                                name='addressTo'
                                value={addressRefund}
                                onChange={(e) => setAddressRefund(e.target.value)}
                                className='text-black'
                            />
                            <button
                                type='button'
                                onClick={handleRefund}
                                className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'>
                                Refund
                            </button>
                        </div>
                    </div>

                    <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center text-white blue-glassmorphism mt-8'>
                        <button onClick={() => showAddresses()}>Get List of Purchasers</button>
                        {toggle && (
                            <div>
                                {addresses.map((address) => (
                                    <div key={address}>
                                        <p>{address}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
