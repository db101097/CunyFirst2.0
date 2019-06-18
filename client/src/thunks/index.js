import axios from 'axios';
import { loginUser } from '../actions';

export const registerThunk = info => dispatch => {
  return axios.post('http://localhost:8080/api/student/register',{
    "email": info.email,
    "firstName": info.firstName,
    "lastName": info.lastName,
    "password": info.password,
    "passwordConfirm": info.passwordConfirm,
    "major": info.major
  }).then(res => {
    // sets token from response as local storage to maintain session
    // for returning logged in user, user is then set as currentUser in the store
    localStorage.setItem('token', res.data.payload);
    dispatch(loginUser(info));
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}

export const loginThunk = info => dispatch => {
  return axios.post('http://localhost:8080/api/student/login', {
    "email": info.email,
    "password": info.password
  }).then(res => {
    // sets token from response as local storage to maintain session
    // for returning logged in user, user is then set as currentUser in the store
    localStorage.setItem('token', res.data.payload);
    dispatch(loginUser(info));
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}
