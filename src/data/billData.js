import axios from 'axios';

const url = 'http://localhost:8000';

const headers = () => (
  {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  }
);

const createHeaders = {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};

const getAllBills = () => axios.get(`${url}/bills`, headers());

const getBillAmounts = () => axios.get(`${url}/bills/sum_bill_amounts`, headers());

const getLeastAmounts = () => axios.get(`${url}/bills/sum_least_amounts`, headers());

const deleteBills = (id) => axios.delete(`${url}/bills/${id}`, headers());

const addBills = (obj) => axios.post(`${url}/bills`, obj, createHeaders);

const updateBills = (obj, id) => axios.put(`${url}/bills/${id}`, obj, createHeaders);

export default { getBillAmounts, getLeastAmounts };
