/** @format */

import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import { logIn, currentUser, unauthenticate } from "../Flow/allowListActions";
import { getUserBalance } from "../Flow/GovernanceActions";

const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isConnected, setIsConnected] = React.useState(false);

  const Disconnect = () => {
    unauthenticate();
    setIsConnected(false);
  };

  const Connect = () => {
    logIn();
    setIsConnected(true);
  };

  React.useEffect(() => {
    currentUser().subscribe(setUser);
  }, []);

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {isConnected === true ? (
          <button onClick={() => Disconnect()}>Disconnect</button>
        ) : (
          <button
            type='button'
            onClick={() => Connect()}
            className='flex flex-row justify-center items-center my-5 bg-[#0f9c45] p-3 rounded-full cursor-pointer hover:bg-[#76ef4e]'>
            <AiFillPlayCircle className='text-white mr-2' />
            <p className='text-white text-base font-semibold'>Connect Wallet</p>
          </button>
        )}
        <div className='flex flex-row ml-10'>
          {isConnected === true ? (
            <div className='border border-green-500 px-4 py-2 rounded-full text-green-500 font-bold'>
              {" "}
              {/* @ts-ignore */}
              {user?.addr}{" "}
            </div>
          ) : (
            <div className='border border-grey-500 px-4 py-2 rounded-full text-grey-500 font-bold'>
              Not Connected
            </div>
          )}
        </div>
      </ul>
      <div className='flex relative'>
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className='z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
            <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {isConnected === true ? (
              <button
                className='my-2 mx-4 text-lg'
                onClick={() => Disconnect()}>
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => Connect()}
                className='my-2 mx-4 text-lg'>
                Connect Wallet
              </button>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
