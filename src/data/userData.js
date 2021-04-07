import axios from 'axios';

const url = 'http://localhost:8000';

const getUserbyID = (id) => axios.get(`${url}/users/${id}`);

const authUser = (usernamePassword) => axios.post(`${url}/login`, usernamePassword);

const addUser = (userobj) => axios.post(`${url}/register`, userobj);

const updateUser = (id, userObj) => axios.put(`${url}/users/${id}`, userObj);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserbyID, authUser, addUser, updateUser,
};
