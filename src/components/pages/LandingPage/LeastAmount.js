import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import billData from '../../../data/billData';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function LeastAmount() {
  const classes = useStyles();
  const [billAmount, setBillAmount] = useState(0);

  useEffect(() => {
    billData.getLeastAmounts()
      .then((res) => {
        setBillAmount(res.data.least_amount__sum);
        console.log(billAmount);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <React.Fragment>
      <Title>Total Least Amount Due Monthly</Title>
      <Typography component="p" variant="h4">{ billAmount }</Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Bills
        </Link>
      </div>
    </React.Fragment>
  );
}
