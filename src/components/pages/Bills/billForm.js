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
      bill_amount: '',
      least_amount: '',
      bill_date: '',
      acct_number: '',
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { formInput };

    const {
      name_on_acct, bill_amount, least_amount, bill_date, acct_number,
    } = this.state;
    const newBill = {
      name_on_acct,
      bill_amount,
      least_amount,
      bill_date,
      acct_number,
    };

    const jsonBill = JSON.stringify(newBill);
    billData.addBills(jsonBill)
      .then((res) => {
        this.props.history.push('/bills');
      })
      .catch((err) => console.error('create bills broke', err));
  };

  //     fetch('https://pointy-gauge.glitch.me/api/form', {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => response.json())
  //       // eslint-disable-next-line no-console
  //       .then((response) => console.log('Success:', JSON.stringify(response)))
  //       .catch((error) => console.error('Error:', error));
  //   };

  const handleInput = (evt) => {
    const { name } = evt.target;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  //   const changeAcctNumber = (e) => {
  //     e.preventDefault();
  //     this.setState({ content: e.target.value });
  //   };

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
            name="name"
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
          <CurrencyTextField
            label="Bill Amount"
            id = "bill_amount"
            name="bill_amount"
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
          <input name="date" type="date" max={moment().format('YYYY-MM-DD')} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </Paper>
    </div>
  );
}
