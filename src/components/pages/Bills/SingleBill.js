/* eslint-disable camelcase */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import Title from '../LandingPage/Title';
// import SettingsIcon from '@material-ui/icons/Settings';
// import TableCell from '@material-ui/core/TableCell';
// import TableRow from '@material-ui/core/TableRow';

import billData from '../../../data/billData';

class SingleBill extends React.Component {
  state = {
    isOPen: false,
  }

  deleteBill = (e) => {
    e.preventDefault();
    const { bill, getBillData } = this.props;
    console.error(bill.id);
    billData.deleteBills(bill.id)
      .then(() => {
        getBillData();
      })
      .catch((err) => console.error(err));
  }

  update = () => {
    const { bill } = this.props;
    this.props.updateThisBill(bill.label, bill.id);
  }

  //   link = (e) => {
  //     e.preventDefault();
  //     const { bill } = this.props;
  //     this.props.history.push(`/bills/${bill.id}`);
  //   }

  billUpdate = (e) => {
    e.preventDefault();
    this.setState({ label: e.target.value });
  }

  render() {
    const {
      amount, least_amount, bill_date, name_on_acct, acct_number, provider_id,
    } = this.props;
    const editBillLink = '/bills/edit';

    return (
    <React.Fragment>
      <Title>{provider_id}</Title>
      <Typography component="p" variant="h4">${amount}</Typography>
      <Typography color="textSecondary">
       {bill_date}
      </Typography>
      <div>
      <button type="button" className="btn btn-secondary"
          onClick={this.deleteBill}>Delete</button> <Link to={editBillLink} className="btn btn-secondary" id="editbutton"><i className="fas fa-edit">Edit</i></Link>
      </div>
    </React.Fragment>
    );
    // <div>
    //   <Card>
    //     <CardBody>
    //       <CardTitle tag="h3">{amount}</CardTitle>
    //       <CardTitle tag="h4">{least_amount}</CardTitle>
    //       <CardTitle tag="h4">{name_on_acct}</CardTitle>
    //       <CardTitle tag="h5">{acct_number}</CardTitle>
    //       <CardSubtitle tag="h6" className="mb-2 text-muted">{provider_id}</CardSubtitle>
    //     </CardBody>
    //     <CardBody>
    //       <CardText></CardText>
    //       <CardLink href="#"></CardLink>
    //       <CardLink href="#"></CardLink>
    //     </CardBody>
    //   </Card>
    // </div>
  }
}

export default SingleBill;
