import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
import SingleBill from './SingleBill';
import Billform from './billForm';
import billData from '../../../data/billData';

class Bills extends React.Component {
  state = {
    bills: [],
    isOpen: false,
    label: '',
    billId: null,
  }

  getBillData = () => {
    billData.getAllBills()
      .then((res) => this.setState({ bills: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getBillData();
  }

  submitBill = (e) => {
    e.preventDefault();
    const { label, updating, billId } = this.state;
    const bill = {};
    const jsonBill = JSON.stringify(bill);

    if (updating) {
      billData.updateBills(billId, jsonBill)
        .then(() => {
          this.setState({ isOpen: false, label: '' });
          this.geBillData();
        })
        .catch((err) => console.error(err));
    } else {
      billData.addBills(jsonBill)
        .then(() => {
          this.setState({ isOpen: false, label: '' });
          this.getBillData();
        })
        .catch((err) => console.error(err));
    }
  }

  updateThisBill = (label, billId) => {
    this.setState({
      label, billId, isOpen: true, updating: true,
    });
  }

  render() {
    const { bills, isOpen, label } = this.state;
    console.log(bills);
    const { history } = this.props;
    // eslint-disable-next-line max-len
    const buildBills = bills.map((bill) => <SingleBill getBillData={this.getBillData} label={bill.label} id={bill.id} amount={bill.amount} least_amount={bill.least_amount} bill_date={bill.bill_date} name_on_acct={bill.name_on_acct} acct_number={bill.acct_number} provider_id={bill.provider.provider_name} BillData={this.getBillData} updateThisBill={this.updateThisBill} history={history} key={bill.id} />);

    const toggle = () => this.setState({ isOpen: !isOpen });

    return (
        <Table>
        <TableHead>
          <h1> Bill Management</h1>
        </TableHead>
        <div>
        <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Add Bill</Button>
              <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                    <Billform getBillData={this.getBillData}/>
                {/* <form>
                    <div className="form-group">
                      <label htmlFor="tagName">Bill Name:</label>
                      <input type="tagName" onChange={this.billUpdate} value={label} className="form-control" aria-describedby="emailHelp" />
                    </div>
                    <button onClick={this.submitBill} className="btn btn-primary">Submit</button>
                  </form> */}
                </CardBody>
              </Card>
            </Collapse>
        </div>
          { buildBills }
      </Table>
    );
  }

  useReducer() {
    return React.useState;
  }
}

export default Bills;
