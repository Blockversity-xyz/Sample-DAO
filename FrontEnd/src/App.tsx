/** @format */

import { Welcome, Admin } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProposalList from "./components/ProposalList";
import CreateProposal from "./components/CreateProposal";
import Sidebar from "./components/Sidebar";
import Vote from "./components/Vote";


const App: React.FC = () => (
  <div className='min-h-screen'>
    <div className='gradient-bg-welcome'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Sidebar />}>
            <Route
              index
              element={<Welcome />}
            />
            <Route
              path='/admin'
              element={<Admin />}
            />


            <Route
              path='/proposal'
              element={<ProposalList />}
            />

            <Route
              path='/create_proposal'
              element={
                <CreateProposal
                  onSubmit={function (
                    title: string,
                    description: string,
                    options: string[],
                    startAt: Date,
                    endAt: Date,
                    minHoldedGVTAmount: number
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            <Route
              path='/vote'
              element={
                <Vote
                  proposalId={0}
                  tokensOwned={0}
                  onVote={function (proposalId: number, vote: boolean): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
