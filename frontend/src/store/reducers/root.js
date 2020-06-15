import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import departmentReducer from './departmentReducer';
import timetableReducer from './timetableReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  department: departmentReducer,
  timetable: timetableReducer,
  course: courseReducer,
});
