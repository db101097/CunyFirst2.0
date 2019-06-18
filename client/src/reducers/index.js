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

export const getClass = (course = null, action) => {
  switch(action.type) {
    case 'GET_CLASS':
      return action.payload;
    default:
      return course;
  }
}
