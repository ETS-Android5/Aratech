import { SET_COURSES, ADD_COURSE } from '../actions/types';

const initialState = {
  courseNames: [],
  courseIDs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COURSES:
      return {
        ...state,
        courseNames: action.payload.courseNames,
        courseIDs: action.payload.courseIDs,
      };
    case ADD_COURSE:
      return {
        ...state,
        courseNames: [...state.courseNames, action.payload.courseName],
        courseIDs: [...state.courseIDs, action.payload.courseID],
      };
    default:
      return state;
  }
}
