import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
// import authData from '../../helpers/data/authData';
import billData from '../../../data/billData';

class Bills extends React.Component {
  state = {
    bills: [],
    isOpen: false,
    label: '',
    billID: null,
    updating: false,
  }

  getBills = () => {
    billData.getAllBills()
      .then((res) => this.setState({ bills: res.data }))
      .catch((err) => console.error('get bills broke ', err));
  }

  componentDidMount() {
    this.getBills();
  }

  billUpdate = (e) => {
    e.preventDefault();
    this.setState({ label: e.target.value });
  }

  submitBill = (e) => {
    e.preventDefault();
    const { updating, billID } = this.state;
    const Bill = { label };
    const jsonBill = JSON.stringify(Bill);

    if (updating) {
      billData.updateBills(jsonBill, billID)
        .then(() => {
          this.setState({ isOpen: false, label: '' });
          this.getBills();
        })
        .catch((err) => console.error(err));
    } else {
      billData.addBills(jsonBill)
        .then(() => {
          this.setState({ isOpen: false, label: '' });
          this.getNoteData();
        })
        .catch((err) => console.error(err));
    }
  }

  updateBill = (label, billID) => {
    this.setState({
      label, billID, isOpen: true, updating: true,
    });
  }

  deleteBill = (id) => {
    billData.deleteBills(id)
      .then(() => { this.getBills(); })
      .catch((err) => console.error(err));
  }

  render() {
    const { bills, isOpen, label } = this.state;
    const { history } = this.props;
    const buildBills = bills.map((Bill) => <SingleBill Bill={Bill} updateBill={this.updateBill} deleteBill={this.deleteBill} history={history} key={Bill.id} />);

    const toggle = () => this.setState({ isOpen: !isOpen });

    return (
      <Table>
          <TableHead>
            <h1>Bills</h1>
          </TableHead>
          <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Add Bill</Button>
              <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                <form>
                    <div className="form-group">
                      <label htmlFor="NoteName">Bill:</label>
                      <input type="NoteName" onChange={this.noteUpdate} className="form-control" aria-describedby="emailHelp" value={label} />
                    </div>
                    <button onClick={this.submitNote} className="btn btn-primary">Submit</button>
                  </form>
                </CardBody>
              </Card>
            </Collapse>
          </div>
            { buildBills }
      </Table>
    );
  }
}

export default Bills;
