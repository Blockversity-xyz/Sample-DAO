import { useState } from "react";
import { Link } from 'react-router-dom';
import { setProxy } from "../Flow/GovernanceActions";
import { setup_GVT } from "../Flow/ICOActions";
import { addAdmin } from "../Flow/ICOActions";
import { useNavigate } from "react-router-dom";


const Welcome: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleSetProxyClick = async () => {
    try {
      await setProxy();
      alert('Proxy set successfully!');
    } catch (error) {
      console.log(error);
      alert('Error setting proxy.');
    }
  };

  const handleSetTokenAdminClick = async () => {
    try {
      await setup_GVT();
      alert('You are now a token Admin!');
      navigate('/purchase');
    } catch (error) {
      console.log(error);
      alert('Error becoming Admin.');
    }
  };

  const handleaddAdminClick = async () => {
    try {
      await addAdmin();
      alert('Change launch details Admin!');
    } catch (error) {
      console.log(error);
      alert('Error becoming Admin for launch details.');
    }
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start items-center flex-col mf:mr-10'>
          <div>
            <h1 className='text-4xl font-bold text-white text-center items-center'>Welcome to the DAO</h1>
          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <p className="text-white text-center">
              Here, you have the opportunity to test the functionalities we have built that go from creating proposals, voting on them, or managing an ICO.
            </p>
            <p className="text-white text-center">
              You can start by setting up your account below.
            </p>
          </div>
          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <button
              className='bg-green-500 text-white rounded-md py-2 px-4'
              onClick={handleSetTokenAdminClick}
            >
              Setup Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
