import axios from 'axios';
import decode from 'jwt-decode'
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
    let decoded = decode(localStorage.token);
    localStorage.setItem('exp', decoded.exp);
    dispatch(loginUser(decoded.data));
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
    let decoded = decode(localStorage.token);
    localStorage.setItem('exp', decoded.exp);
    dispatch(loginUser(decoded.data));
  }).catch(err => {
    console.log(err);
  })
}

export const revisitThunk = () => dispatch => {
  const token = localStorage.token;
  if(token){
    let decoded = decode(token);
    dispatch(loginUser(decoded.data));
  }
}
