export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    payload: user
  }
}

export const returnClass = (course) => {
  return {
    type: 'GET_CLASS',
    payload: course
  }
}
