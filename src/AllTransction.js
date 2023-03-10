import React, { useContext, useEffect, useState } from "react";
import BlockTransctionTable from "./components/BlockTransctionTable";
import { Web3Context } from "./App";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CustomizedTables() {
  const [blockdata, setBlockdata] = useState(null);
  const { web3 } = useContext(Web3Context);

  useEffect(() => {
    // Get all getPendingTransactions
    web3.eth.getBlockNumber().then(function (blockNumber) {
      console.log("Latest block number: " + blockNumber);

      let blocks = [];
      for (var i = blockNumber; i >= blockNumber - 10; i--) {
        blocks.push(i);
      }
      setBlockdata(blocks);
    });
  }, []);

  console.log("------blockdata-------->", blockdata);
  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {blockdata?.map((blockNumber) => {
          return (
            <Grid item xs={6}>
              <Item>
                {blockNumber && (
                  <div style={{ margin: 10 }}>
                    <BlockTransctionTable blockNumber={blockNumber} />
                  </div>
                )}
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
