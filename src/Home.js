import React, { useContext, useEffect, useState } from "react";
import BlockTransctionTable from "./components/BlockTransctionTable";
import SendEth from "./components/SendEth";
import { Web3Context, RPC_URL } from "./App";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CustomizedTables() {
  const [blockdata, setBlockdata] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [coinbase, setCoinbase] = useState(null);
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

    web3.eth.getChainId().then((data) => setChainId(data));

    web3.eth.getCoinbase().then((data) => {
      setCoinbase(data);

      web3.eth.getBalance(data).then((data) => {
        const ethValue = web3.utils.fromWei(data, "ether");
        console.log("----ethValue", ethValue);
      });
    });
  }, []);

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20, padding: 40 }}>
        <Grid item xs={4}>
          <Item>
            RPC &nbsp;&nbsp;
            <b>{RPC_URL}</b>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Chain ID# <b>{chainId}</b>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Coin Base Address <b>{coinbase}</b>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <SendEth />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item></Item>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {blockdata?.map((blockNumber) => {
          return (
            <Grid item xs={6}>
              <Item>
                {blockNumber && blockNumber > 0 && (
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
