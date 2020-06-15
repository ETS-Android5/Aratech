import { SET_COURSES, ADD_COURSE } from '../actions/types';

const initialState = {
  courses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COURSES:
      return { ...state, courses: action.payload };
    case ADD_COURSE:
      return { ...state, courses: state.courses.push(action.payload) };
    default:
      return state;
  }
}
