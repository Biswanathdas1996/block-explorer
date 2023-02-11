import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";
import Typography from "@mui/material/Typography";
import { JSONTree } from "react-json-tree";

export default function TransctionByTXN({ transctionHash }) {
  const [transction, setTransction] = useState(null);
  const { web3 } = useContext(Web3Context);

  useEffect(() => {
    web3.eth.getTransaction(transctionHash).then(function (transction) {
      setTransction(transction);
    });
  }, []);

  return (
    <>
      <Typography>
        Transction # <b>{transctionHash}</b>
      </Typography>
      <div style={{ textAlign: "left" }}>
        <JSONTree data={transction} theme={"monokai"} invertTheme={false} />
      </div>
    </>
  );
}
