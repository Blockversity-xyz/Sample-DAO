/** @format */

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getProposals } from "../Flow/GovernanceActions";


type Proposal = {
  id: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  minHoldedGVTAmount: string;
  options: string[];
};


export default function ProposalList() {
  const [showActiveProposals, setShowActiveProposals] = useState(true);
  const [proposalData, setProposalData] = useState<Proposal[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProposals();
      const formattedData = data.map((proposal: Proposal) => {
        return {
          ...proposal,
          startAt: new Date(Number(proposal.startAt) * 1000),
          endAt: new Date(Number(proposal.endAt) * 1000),
        };
      });
      setProposalData(formattedData);
    }

    fetchData();
  }, []);

  console.log(proposalData, "Called in the frontend");

  const proposals = showActiveProposals
    ? proposalData.filter((proposal) => proposal.endAt >= new Date())
    : proposalData.filter((proposal) => proposal.endAt < new Date());

  return (
    <div className='flex justify-center items-center'>
      <div className='px-4 pt-3 pb-4 flex flex-col text-white'>
        <div className='flex-1'>
          <div className='flex justify-center mb-3'>
            <button
              className={`mr-3 py-1 px-2 border-b-2 ${showActiveProposals
                ? "border-blue-500 font-semibold"
                : "border-transparent"
                }`}
              onClick={() => setShowActiveProposals(true)}>
              Active Proposals
            </button>
            <button
              className={`py-1 px-2 border-b-2 ${!showActiveProposals
                ? "border-blue-500 font-semibold"
                : "border-transparent"
                }`}
              onClick={() => setShowActiveProposals(false)}>
              Past Proposals
            </button>
          </div>
          <div>
            <table className='w-full' style={{ tableLayout: "fixed" }}>
              <thead className='border border-gray-200 rounded-full my-3 custom-thead'>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>
                    TOKENS
                    <br />
                    REQUIRED
                  </th>
                  <th>OPTIONS</th>
                </tr>
              </thead>
              <tbody className='border border-gray-200 bg-slate-500 rounded-sm mt-3 text-center'>



                {proposals.map((proposal: Proposal) => (
                  <tr key={proposal.id}>
                    <td>#{proposal.id}</td>
                    <td>{proposal.title}</td>
                    <td>{proposal.description}</td>
                    <td>{format(proposal.startAt, "yyyy-MM-dd")}</td>
                    <td>{format(proposal.endAt, "yyyy-MM-dd")}</td>
                    <td>{proposal.minHoldedGVTAmount}</td>
                    <td>
                      {proposal.options.map((option, index) => (
                        <div key={index}>{option}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

}
