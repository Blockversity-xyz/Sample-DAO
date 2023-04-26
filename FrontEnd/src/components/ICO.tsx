/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSaleInfo } from "../Flow/ICOActions";

const ICO: React.FC = () => {
  const totalTokens = 1000000;
  const totalUsers = 500;
  const totalFunds = 1000000;

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-row w-full max-w-3xl'>
        <div className='bg-white p-6 rounded-lg shadow-md mr-4'>
          <div className='text-lg font-medium mb-4'>Total Tokens</div>
          <div className='text-4xl font-bold text-green-500'>{totalTokens}</div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md mr-4'>
          <div className='text-lg font-medium mb-4'>Total Users</div>
          <div className='text-4xl font-bold text-blue-500'>{totalUsers}</div>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='text-lg font-medium mb-4'>Total Funds</div>
          <div className='text-4xl font-bold text-purple-500'>
            ${totalFunds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICO;
