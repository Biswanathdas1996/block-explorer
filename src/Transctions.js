import React from "react";
import { useParams } from "react-router-dom";
import TransctionByTXN from "./components/TransctionByTXN";

function Transctions() {
  const { txn } = useParams();
  return <TransctionByTXN transctionHash={txn} />;
}

export default Transctions;
