import React, { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AllTransction from "./AllTransction";
import Transction from "./Transctions";
import Web3 from "web3";

const About = () => <h1>About</h1>;
const Contact = () => <h1>Contact</h1>;

export const Web3Context = createContext();

export const RPC_URL = "http://127.0.0.1:8545";

const App = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

  return (
    <Web3Context.Provider value={{ web3 }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blocks" element={<AllTransction />} />
        <Route exact path="/tx/:txn" element={<Transction />} />
      </Routes>
    </Web3Context.Provider>
  );
};

export default App;
