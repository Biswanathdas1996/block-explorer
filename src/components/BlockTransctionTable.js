import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Web3Context } from "../App";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import Avatar from "@mui/material/Avatar";
import { JSONTree } from "react-json-tree";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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

export default function BlockTransctionTable({ blockNumber }) {
  const [blockdata, setBlockdata] = useState(null);
  const { web3 } = useContext(Web3Context);
  const [expanded, setExpanded] = React.useState("panel2");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    // console.log("Latest block number: " + blockNumber);
    web3.eth.getBlock(blockNumber).then(function (block) {
      console.log("Transactions in block: " + block.transactions);
      setBlockdata(block);
    });
  }, []);

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            Block No: <b>{blockdata?.number}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ textAlign: "left" }}>
            <JSONTree data={blockdata} theme={"monokai"} invertTheme={false} />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Transctions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transaction Hash</StyledTableCell>
                  <StyledTableCell>View</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blockdata?.transactions?.map((row) => (
                  <StyledTableRow key={"test"}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ display: "flex" }}
                    >
                      <Avatar>TX</Avatar>
                      <Typography
                        variant="h5"
                        item
                        fontWeight="600"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          // width: "20rem",
                          margin: 1,
                        }}
                        style={{ fontSize: 12 }}
                      >
                        <b>{row} </b>
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <a href={`/#/tx/${row}`} target="_blank">
                        <Button variant="outlined" startIcon={<LaunchIcon />}>
                          View
                        </Button>
                      </a>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
