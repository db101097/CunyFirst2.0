const initialState = {
  currentUser: {}
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return {...state, currentUser: action.payload}
    default:
      return state;
  }
}

export const getClasses = (classes = [], action) => {
  switch(action.type) {
    case 'GET_CLASSES':
      return action.payload;
    default:
      return classes;
  }
}

export const getSchedule = (schedule = [], action) => {
  switch(action.type){
    case 'GET_SCHEDULE':
      return action.payload;
    default:
      return schedule;
  }
}
