import { LOAD_DEPARTMENTS } from '../actions/types';

const initialState = {
  departmentNames: [],
  departmentIDs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEPARTMENTS:
      return {
        ...state,
        departmentNames: action.payload.departmentNames,
        departmentIDs: action.payload.departmentIDs
      };
    default:
      return state;
  }
}
