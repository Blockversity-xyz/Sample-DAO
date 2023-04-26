/** @format */

import React, { useState } from "react";
import { vote } from "../Flow/GovernanceActions";
import sellToken from "./SellToken";

interface VoteProps {
  proposalId: number;
  tokensOwned: number;
  onVote: (proposalId: number, vote: boolean) => void;
}

const Vote: React.FC<VoteProps> = ({ proposalId, tokensOwned, onVote }) => {
  const [vote, setVote] = useState<boolean | null>(null);

  const handleVote = (vote: boolean) => {
    setVote(vote);
    onVote(proposalId, vote);
  };

  return (
    <div className='flex items-center justify-between py-2 px-4 blue-glassmorphism shadow rounded-lg'>
      <div>
        <p className='text-lg font-medium text-white'>Vote</p>
        <p className='text-sm text-gray-500'>You have {tokensOwned} tokens.</p>
      </div>
      <div className='flex items-center justify-between'>
        <button
          className={`${vote === true
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded-lg mr-2`}
          disabled={vote === true || tokensOwned === 0}
          onClick={() => handleVote(true)}>
          For
        </button>
        <button
          className={`${vote === false
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded-lg`}
          disabled={vote === false || tokensOwned === 0}
          onClick={() => handleVote(false)}>
          Against
        </button>
      </div>
    </div>
  );
};

export default Vote;
