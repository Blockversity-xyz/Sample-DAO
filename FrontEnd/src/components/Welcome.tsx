/** @format */

import { signWhitelist, getAllAddresses } from "../Flow/allowListActions";
import { purchaseBVT } from "../Flow/ICOActions";
import { useEffect, useState } from "react";
import { currentUser } from "../Flow/allowListActions";
import { Link } from 'react-router-dom';
import { setProxy, depositProposer } from "../Flow/GovernanceActions";
import { setTokenAdmin } from "../Flow/ICOActions";
import { setup_fusd, setup_GVT } from "../Flow/ICOActions";
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
  const [FUSD, setFUSD] = useState<string>("");
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
      await setup_GVT();
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
            <h1 className='text-4xl font-bold text-white'>Welcome to the</h1>
            <h1 className='text-4xl font-bold text-white'>DAO</h1>
          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            {/* Buttons here if needed */}
            <p> Here is you have the opportunity to test the functionalities we have built that go from creating proposals, voting on them, or managing an ICO.</p>
          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            {/* Buttons here if needed */}
            <button
              className='bg-white text-black rounded-md py-2 px-4'
              onClick={handleSetFUSDClick}
            >
              Set FUSD
            </button>
            <button
              className='bg-white text-black rounded-md py-2 px-4'
              onClick={handleSetTokenAdminClick}
            >
              Set GVT
            </button>
            <p> To start, you need to connect your wallet. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
