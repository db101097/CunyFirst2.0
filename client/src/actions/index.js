export const loginUser = (user) => {
  return {
    type: 'LOGIN_USER',
    payload: user
  }
}

export const getClasses = (classes) => {
  return {
    type: 'GET_CLASSES',
    payload: classes
  }
}

export const getSchedule = (schedule) => {
  return {
    type: 'GET_SCHEDULE',
    payload: schedule
  }
}
