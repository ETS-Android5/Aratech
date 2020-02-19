import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../../validations/isEmpty';

const initialState = {
  isAuthenticated: false,
  isLecturer: false,
  isStudent: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isLecturer: action.isLecturer,
        isStudent: action.isStudent,
        user: action.payload
      };
    default:
      return state;
  }
}
