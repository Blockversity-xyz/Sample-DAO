import React from 'react';

import logo from '../assets/react.svg';

const Footer: React.FC = () => (
  <div className="w-full flex  absolute bottom-0 md:justify-center justify-between items-center flex-col p-4">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">

      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <a href="https://flow.com/" className="text-white text-base text-center mx-2 cursor-pointer">Flow</a>
        <a href="https://www.flowverse.co/" className="text-white text-base text-center mx-2 cursor-pointer">Flowverse</a>
        <a href="https://forum.onflow.org/" className="text-white text-base text-center mx-2 cursor-pointer">Flow Forum</a>
        <a href="https://developers.flow.com/" className="text-white text-base text-center mx-2 cursor-pointer">Flow Developer Portal</a>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">Learn more about Flow</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">

    </div>
  </div>
);

export default Footer;