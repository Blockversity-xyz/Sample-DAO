/**
 * The main component of the application.
 * Renders the Sidebar and the content based on the current route.
 */
/** @format */

import React from "react";
import Welcome from "./components/Welcome";
import Admin from "./components/Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProposalList from "./components/DAO/ProposalList";
import CreateProposal from "./components/DAO/CreateProposal";
import Sidebar from "./components/Sidebar";

import PurchaseToken from "./components/PurchaseToken";


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
              path='/purchase'
              element={<PurchaseToken />}
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
);

export default App;
