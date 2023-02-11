import React, { useState, useEffect } from "react";
import Web3 from "web3";

const App = () => {
  const [blockNumber, setBlockNumber] = useState(null);
  const [getTransactiondata, setGetTransaction] = useState(null);

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com")
    );
    web3.eth.getBlockNumber().then((res) => {
      setBlockNumber(res);
    });

    // Get transction details by transction hash
    web3.eth
      .getTransaction(
        "0xc61521bbc1ba4a3e38f9ec1d435db6cea6468e1227ab4208d122d52da4f5e968"
      )
      .then((res) => {
        setGetTransaction(res);
      });

    // Get balance
    // web3.eth
    //   .getBalance("0xaca32E90B219B11b9f8b34C8137F5C4e71c574d9")
    //   .then(console.log);
    // Get all getPendingTransactions
    web3.eth.getBlockNumber().then(function (blockNumber) {
      console.log("Latest block number: " + blockNumber);
      web3.eth.getBlock(blockNumber).then(function (block) {
        console.log("Transactions in block: " + block.transactions);
      });
    });

    // for (var i = blockNumber; i >= 0; i--) {
    //     web3.eth.getBlock(i).then(function(block) {
    //       console.log("Transactions in block: " + block.transactions);
    //     });
    //   }
  }, []);

  return (
    <div>
      <h1>Blockchain Example</h1>
      {blockNumber ? (
        <>
          <p>Current block number: {blockNumber}</p>
          <p>Transaction: {JSON.stringify(getTransactiondata)}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
