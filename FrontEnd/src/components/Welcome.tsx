
import { useNavigate } from "react-router-dom";
import {
  setup_USDC,
} from "../Flow/ICOActions";
import { transfer_USDC } from "../Flow/GovernanceActions";



/**
 * Renders the Welcome component.
 * @returns JSX.Element
 */
const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleSetProxyClick = async () => {
    try {
      await setup_USDC();
      alert('You now have all the necessary permissions!');
      navigate('/purchase');
    } catch (error) {
      console.log(error);
      alert('Error when getting the necessary permissions.');
    }
  };


  const handleTransferUSDC = async () => {
    try {
      await transfer_USDC();
      alert('USDC transferred!');
    } catch (error) {
      console.log(error);
      alert('Error transferring USDC.');
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
              onClick={handleSetProxyClick}
            >
              Set Up Account USDC Vault
            </button>
          </div>


          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <button
              className='bg-green-500 text-white rounded-md py-2 px-4'
              onClick={handleTest}
            >
              Test Set Up Storage
            </button>
          </div>

          <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
            <button
              className='bg-green-500 text-white rounded-md py-2 px-4'
              onClick={handleTransferUSDC}
            >
              Transfer FiatTokens (USDC)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
      </div>
    </div>
  );
};

export default Welcome;
