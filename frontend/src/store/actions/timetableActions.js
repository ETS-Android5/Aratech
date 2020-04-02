import API from "../../network/api";
import { SET_PERSONAL_TIMETABLE } from "./types";
import cogoToast from "cogo-toast";

//get user personal timetable
export const getStudentPersonalTimetable = () => async dispatch => {
  let response;
  try {
    response = await API.get("timetable/personal");
    const { personalTimeTable } = response.data.data;
    dispatch({
      type: SET_PERSONAL_TIMETABLE,
      payload: personalTimeTable
    });
  } catch (error) {
    console.error(error);
    cogoToast.error(error.response.data.message);
  }
};
