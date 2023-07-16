import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getProposals, vote } from "../../Flow/GovernanceActions";
import { getVotedRecords } from "../../Flow/ICOActions";

type Proposal = {
  id: number;
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
  const [votedRecords, setVotedRecords] = useState<any[]>([]);

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

    async function fetchVotedRecords() {
      const data = await getVotedRecords();
      setVotedRecords(data);
    }

    fetchData();
    fetchVotedRecords();
  }, []);

  const handleOptionClick = (proposalId: number, optionIndex: number) => {
    // Perform the desired logic with the proposalId and optionIndex
    console.log("Clicked Proposal ID:", proposalId);
    console.log("Clicked Option Index:", optionIndex);
    vote(proposalId, optionIndex);
  };

  const getVoteCount = (proposalId: number, optionIndex: number) => {
    const votes = votedRecords[proposalId] || {};
    const address = Object.keys(votes)[0];
    return votes[address];
  };

  const getVoteTotalCount = (proposalId: number, optionIndex: number) => {
    const votes = votedRecords[proposalId] || {};
    const addressKeys = Object.keys(votes);
    let totalCount = 0;

    addressKeys.forEach((address) => {
      const voteCount = votes[address][optionIndex];
      totalCount += 1;
    });

    return totalCount;
  };

  const getIndividualVoteCounts = (proposalId: number, optionIndex: number) => {
    const votes: { [address: string]: number[] } = votedRecords[proposalId] || {};
    const addressKeys = Object.keys(votes);
    const individualVotes: { [address: string]: number } = {};

    addressKeys.forEach((address) => {
      const voteCount = votes[address][optionIndex];
      individualVotes[address] = voteCount;
    });

    return individualVotes;
  };

  const proposals = showActiveProposals
    ? proposalData.filter((proposal) => proposal.endAt >= new Date())
    : proposalData.filter((proposal) => proposal.endAt < new Date());

  return (
    <div className="flex justify-center items-center">
      <div className="px-4 pt-3 pb-4 flex flex-col text-white">
        <div className="flex-1">
          <div className="flex justify-center mb-3">
            <button
              className={`mr-3 py-1 px-2 border-b-2 ${showActiveProposals
                ? "border-blue-500 font-semibold"
                : "border-transparent"
                }`}
              onClick={() => setShowActiveProposals(true)}
            >
              Active Proposals
            </button>
            <button
              className={`py-1 px-2 border-b-2 ${!showActiveProposals
                ? "border-blue-500 font-semibold"
                : "border-transparent"
                }`}
              onClick={() => setShowActiveProposals(false)}
            >
              Past Proposals
            </button>
          </div>
          <div>
            <table className="w-full" style={{ tableLayout: "fixed" }}>
              <thead className="border border-gray-200 rounded-full my-3 custom-thead">
                <tr>
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
              <tbody className="border border-gray-200 bg-slate-500 rounded-sm mt-3 text-center">
                {proposals.map((proposal: Proposal) => (
                  <tr key={proposal.id}>
                    <td>{proposal.title}</td>
                    <td>{proposal.description}</td>
                    <td>{format(proposal.startAt, "yyyy-MM-dd")}</td>
                    <td>{format(proposal.endAt, "yyyy-MM-dd")}</td>
                    <td>{proposal.minHoldedGVTAmount}</td>
                    <td className="flex flex-col">
                      {proposal.options.map((option, optionIndex) => {
                        const individualVotes = getIndividualVoteCounts(proposal.id, optionIndex);
                        const totalVotes = getVoteTotalCount(proposal.id, optionIndex);
                        // Calculate the count of addresses at each count
                        const addressCountMap: { [count: number]: number } = Object.values(individualVotes).reduce(
                          (acc, count) => {
                            acc[count] = (acc[count] || 0) + 1;
                            return acc;
                          },
                          {} as { [count: number]: number }
                        );
                        return (
                          <button
                            key={optionIndex}
                            className="option-button hover:bg-blue-700 text-white font-bold py-2 rounded"
                            onClick={() => handleOptionClick(proposal.id, optionIndex)}
                          >
                            {option}
                            <div className="text-xs mt-1">
                              {addressCountMap[optionIndex] !== undefined && (
                                <div>
                                  {addressCountMap[optionIndex] / totalVotes * 100}% of voters ({addressCountMap[optionIndex]} / {totalVotes})
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
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
