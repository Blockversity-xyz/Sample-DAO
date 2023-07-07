/** @format */

import { signWhitelist, getAllAddresses } from "../Flow/allowListActions";
import { purchaseBVT, setupBVT } from "../Flow/ICOActions";
import { useEffect, useState } from "react";
import { currentUser } from "../Flow/allowListActions";
import { Link } from 'react-router-dom';
import { setProxy, depositProposer } from "../Flow/GovernanceActions";
import { setTokenAdmin } from "../Flow/ICOActions";
import { setup_fusd } from "../Flow/ICOActions";
import { addAdmin } from "../Flow/ICOActions";
interface InputProps {
  placeholder: string;
  name: string;
  type: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
}

const Welcome: React.FC = () => {
  //   const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext<TransactionContext>(TransactionContext);
  const [buyAmount, setBuyAmount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
  });
  const [user, setUser] = useState<{ addr: string } | null>(null);
  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(() => {
    currentUser().subscribe(setUser);
  }, []);

  const showAddresses = () => {
    setToggle(!toggle);
  };



  useEffect(() => {
    getAllAddresses().then((addresses) => {
      setAddresses(addresses);
    });
  }, []);

  const handleSetProxyClick = async () => {
    try {
      await setProxy();
      alert('Proxy set successfully!');
    } catch (error) {
      console.log(error);
      alert('Error setting proxy.');
    }
  };

  const handleSetFUSDClick = async () => {
    try {
      await setup_fusd();
      alert('FUSD set successfully!');
    } catch (error) {
      console.log(error);
      alert('Error setting FUSD.');
    }
  };

  const handleSetTokenAdminClick = async () => {
    try {
      await setTokenAdmin();
      alert('You are now a token Admin!');
    } catch (error) {
      console.log(error);
      alert('Error becoming Admin.');
    }
  };


  const handleaddAdminClick = async () => {
    try {
      await addAdmin();
      alert('change launch details Admin!');
    } catch (error) {
      console.log(error);
      alert('Error becoming Admin launch details.');
    }
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
          <div>
            {user && user?.addr ? (
              <div>
                <p className='text-left my-2 text-white font-light text-base'>You have successfully signed the whitelist</p>

                {user?.addr && !addresses.includes(user?.addr) && (
                  <button
                    type='button'
                    onClick={() => signWhitelist()}
                    className='flex flex-row justify-center items-center my-5 bg-[#0f9c45] p-3 rounded-full cursor-pointer hover:bg-[#76ef4e]'>
                    <p className='text-white text-base font-semibold'>Sign Whitelist</p>
                  </button>)}


                {user?.addr && addresses.includes(user?.addr) && (
                  <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center text-white'>
                    <p className='text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base'>You can now review or create proposals or vote on current ones</p>
                    <button onClick={() => showAddresses()}>Get All Addresses</button>
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
                )}
              </div>
            ) : (
              <p className='text-left text-white font-light '>Welcome to Your DAO <br />
                To get started, you need to connect your wallet!</p> // on put 2 lines
            )}
          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <button
              className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#125030] rounded-full cursor-pointer'
              onClick={handleSetProxyClick}
            >
              Setup Account
            </button>

            <br />
            <button
              className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#125030] rounded-full cursor-pointer'
              onClick={handleSetFUSDClick}
            >
              Setup FUSD
            </button>

          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <button
              className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#125030] rounded-full cursor-pointer'
              onClick={handleSetTokenAdminClick}
            >
              Become Token Admin
            </button>

          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <button
              className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#125030] rounded-full cursor-pointer'
              onClick={handleaddAdminClick}
            >
              Become sale Admin
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
