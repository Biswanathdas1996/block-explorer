import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Web3Context } from "../App";

const InitialValues = {
  from: "",
  to: "",
  amount: "",
};

const ExampleForm = () => {
  const { web3 } = useContext(Web3Context);
  const onSubmit = (values) => {
    console.log("Form values", values);
    web3.eth
      .sendTransaction({
        from: values?.from,
        to: values?.to,
        value: values?.amount,
      })
      .then(function (receipt) {
        console.log("------receipt-------->", receipt);
      });
  };
  return (
    <Formik initialValues={InitialValues} onSubmit={onSubmit}>
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="from"
            placeholder="Enter From address"
            value={values.from}
            onChange={handleChange}
            style={{ marginTop: 10 }}
          />

          <TextField
            type="text"
            name="to"
            placeholder="Enter to  address"
            value={values.to}
            onChange={handleChange}
            style={{ marginTop: 10 }}
          />
          <TextField
            type="text"
            name="amount"
            placeholder="Enter amount"
            value={values.amount}
            onChange={handleChange}
            style={{ marginTop: 10 }}
            fullWidth
          />
          <Button type="submit" style={{ marginTop: 10 }} variant="contained">
            Send coins
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ExampleForm;
