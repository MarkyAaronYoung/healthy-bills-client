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

const getAllProviders = () => axios.get(`${url}/providers`, headers());

const deleteProviders = (id) => axios.delete(`${url}/providers/${id}`, headers());

const addProviders = (obj) => axios.post(`${url}/providers`, obj, createHeaders);

const updateProviders = (obj, id) => axios.put(`${url}/providers/${id}`, obj, createHeaders);
