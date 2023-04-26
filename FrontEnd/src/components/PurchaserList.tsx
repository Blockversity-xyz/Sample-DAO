/** @format */

import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getProposals } from "../Flow/GovernanceActions";

type Proposal = {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    tokens_required: string;
    options: boolean;
};

const recentData: Proposal[] = [
    {
        id: "1",
        title: "chicken nuggets",
        description: "chicken nuggets",
        start_date: "2021-05-17T03:24:00",
        end_date: "2022-05-17T03:24:00",
        tokens_required: "100",
        options: true,
    },
    // ...
];

export default function ProposalList() {
    const [showActiveProposals, setShowActiveProposals] = useState(true);
    const proposalData = getProposals();

    console.log(getProposals(), "Called in the frontend");
    const proposals = showActiveProposals
        ? recentData.filter((proposal) => new Date(proposal.end_date) >= new Date())
        : recentData.filter((proposal) => new Date(proposal.end_date) < new Date());

    return (
        <div className='flex justify-center items-center'>
            <div className='px-4 pt-3 pb-4 flex flex-col text-black'>
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
                                        <td>
                                            {format(new Date(proposal.start_date), "dd MMM yyyy")}
                                        </td>
                                        <td>
                                            {format(new Date(proposal.end_date), "dd MMM yyyy")}
                                        </td>
                                        <td>{proposal.tokens_required}</td>
                                        <td>{proposal.options ? "Accept" : "Reject"}</td>
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
