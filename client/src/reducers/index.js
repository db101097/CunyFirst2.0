export const getClass = (course = null, action) => {
  switch(action.type) {
    case 'GET_CLASS':
      return action.payload;
    default:
      return course;
  }
}
