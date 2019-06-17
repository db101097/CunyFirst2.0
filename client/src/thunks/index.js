import axios from 'axios';

export const registerThunk = info => dispatch => {
  return axios.post('http://localhost:8080/api/student/register',{
    "email": info.email,
    "firstName": info.firstName,
    "lastName": info.lastName,
    "password": info.password,
    "passwordConfirm": info.passwordConfirm,
    "major": info.major
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}
