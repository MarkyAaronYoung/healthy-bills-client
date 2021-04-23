/* eslint-disable camelcase */
import React, { useReducer } from 'react';
import {
  Button, Icon, TextField, Paper, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import billData from '../../../data/billData';
// eslint-disable-next-line import/prefer-default-export
export default function BillForm(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    root: {
      padding: theme.spacing(3, 2),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
  }));

  //   const [value, setValue] = React.useState();

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name_on_acct: '',
      amount: '',
      least_amount: '',
      bill_date: '',
      acct_number: '',
      provider_id: 1,
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { formInput };

    const jsonBill = JSON.stringify(formInput);
    billData.updateBills(jsonBill)
      .then((res) => {
        props.getBillData();
      })
      .catch((err) => console.error('update bills broke', err));
  };

  const handleInput = (evt) => {
    const { name } = evt.target;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const classes = useStyles();

  // eslint-disable-next-line no-console
  console.log(props);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.formName}
        </Typography>
        <Typography component="p">{props.formDescription}</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            id="name_on_acct"
            name="name_on_acct"
            defaultValue={formInput.email}
            className={classes.textField}
            helperText="Enter your full name"
            onChange={handleInput}
          />
           <TextField
            label="Account Number"
            id="acct_number"
            name="acct_number"
            defaultValue={formInput.email}
            className={classes.textField}
            helperText="Enter your account number"
            onChange={handleInput}
          />
           <TextField
            label="Provider Name"
            id="provider"
            name="provider_id"
            defaultValue={formInput.email}
            className={classes.textField}
            helperText="Enter your provider's name"
            onChange={handleInput}
          />
          <CurrencyTextField
            label="Bill Amount"
            id = "amount"
            name="amount"
            variant="standard"
            // value={value}
            currencySymbol="$"
            outputFormat="string"
            // eslint-disable-next-line no-shadow
            onChange={handleInput}
          />
           <CurrencyTextField
            label="Lowest Montly Amount Provider Accepts"
            id = "least_amount"
            name="least_amount"
            variant="standard"
            // value={value}
            currencySymbol="$"
            outputFormat="string"
            // eslint-disable-next-line no-shadow
            onChange={handleInput}
          />
          <label>Date of Bill</label>
          <input name="bill_date" type="date" max={moment().format('YYYY-MM-DD')} onChange={handleInput}/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Update <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </Paper>
    </div>
  );
}
