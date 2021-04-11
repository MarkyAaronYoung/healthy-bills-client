import React from 'react';
// import SettingsIcon from '@material-ui/icons/Settings';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Trashmodal from '../Modal/Trashmodal';
import Editmodal from '../Modal/Editmodal';

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
    const { bill } = this.props;
    return (
      <div className='card single-tag'>
        <TableRow className='button-group'>
          <TableCell><Trashmodal bill={bill} deleteBill={this.deleteBill}/></TableCell>
          <TableCell><Editmodal bill={bill} update={this.update}/> </TableCell>
          <TableCell className='card-label'>{bill.label}</TableCell>
        </TableRow>
      </div>
    );
  }
}

export default SingleBill;
