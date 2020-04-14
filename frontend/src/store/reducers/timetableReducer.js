import { SET_CLASS_TIMETABLE, SET_PERSONAL_TIMETABLE } from '../actions/types';

const initialState = {
  classTimetable: [],
  personalTimetable: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CLASS_TIMETABLE:
      return {
        ...state,
        classTimetable: action.payload,
      };
    case SET_PERSONAL_TIMETABLE:
      return {
        ...state,
        personalTimetable: action.payload,
      };
    default:
      return state;
  }
}
