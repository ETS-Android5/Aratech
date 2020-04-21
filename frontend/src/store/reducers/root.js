import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import departmentReducer from "./departmentReducer";
import timetableReducer from "./timetableReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  department: departmentReducer,
  timetable: timetableReducer
});
