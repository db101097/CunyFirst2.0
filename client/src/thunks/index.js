import axios from 'axios';
import decode from 'jwt-decode'
import { loginUser, getClasses, getSchedule } from '../actions';

export const registerThunk = info => dispatch => {
  return axios.post('https://api.mwong.io/api/student/register',{
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
    window.location.replace('/');
  }).catch(err => {
    window.alert('Invalid Information!\nTry Again: Make sure your email is valid!');
    window.location.replace('/register');
  })
}

export const loginThunk = info => dispatch => {
  return axios.post('https://api.mwong.io/api/student/login', {
    "email": info.email,
    "password": info.password
  }).then(res => {
    // sets token from response as local storage to maintain session
    // for returning logged in user, user is then set as currentUser in the store
    localStorage.setItem('token', res.data.payload);
    let decoded = decode(localStorage.token);
    localStorage.setItem('exp', decoded.exp);
    dispatch(loginUser(decoded.data));
    window.location.replace('/');
  }).catch(err => {
    window.alert('Wrong Credentials!\nTry Again or Register an Account');
    window.location.replace('/login');
  })
}

export const revisitThunk = () => dispatch => {
  const token = localStorage.token;
  if(token){
    let decoded = decode(token);
    dispatch(loginUser(decoded.data));
  }
}

export const searchThunk = term => dispatch => {
  return axios.get('https://api.mwong.io/getClasses/'+term+'/0')
    .then(res => {
      dispatch(getClasses(res.data));
    })
    .catch(err => {
      console.log(err);
    })
}

export const addThunk = (classID, studentID) => dispatch => {
  return axios.post('https://api.mwong.io/addClass/' + classID, {
    "studentId": studentID
  }).then(res => {
    console.log(res);
    window.alert('SUCCESS:\nClass Added')
    window.location.replace('/');
  }).catch(err => {
    console.log(err);
    window.alert('ERROR:\nClass selected conflicts with your schedule!')
  })
}

export const deleteThunk = (classID, studentID) => dispatch => {
  return axios.delete('https://api.mwong.io/deleteClass/' + classID + '/' + studentID)
    .then(res => {
      console.log(res);
      window.alert('SUCCESS:\nClass Deleted')
      window.location.replace('/');
    }).catch(err => {
      console.log(err.response);
      window.alert('ERROR:\nUnable to delete class!')
    })
}

export const getScheduleThunk = studentID => dispatch => {
  return axios.get('https://api.mwong.io/getSchedule/' + studentID)
    .then(res => {
      console.log(res.data);
      dispatch(getSchedule(res.data));
    })
    .catch(err => {
      console.log(err);
    })
}
