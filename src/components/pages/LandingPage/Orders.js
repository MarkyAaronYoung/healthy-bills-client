import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, amount) {
  return {
    id, date, name, shipTo, amount,
  };
}

const rows = [
  createData(0, '12 May, 2019', 'John B. Townes', 'Tristar Health', 312.44),
  createData(1, '16 Apr, 2020', 'John Townes', 'Vanderbilt Sleep Clinic', 866.99),
  createData(2, '23 Oct 2020', 'John Barry Townes', 'Dr. Carrier', 100.81),
  createData(3, '11 Dec, 2020', 'John Townes', 'Pathway Group', 654.39),
  createData(4, '7 Feb, 2021', 'John B. Townes', 'Urology Associates', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Bills</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Provider Name</TableCell>
            <TableCell align="right">Bill Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
