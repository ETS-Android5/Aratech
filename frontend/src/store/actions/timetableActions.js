import API from '../../network/api';
import { SET_PERSONAL_TIMETABLE, SET_CLASS_TIMETABLE } from './types';
import cogoToast from 'cogo-toast';

//get user personal timetable
export const getStudentPersonalTimetable = () => async (dispatch) => {
  let response;
  try {
    response = await API.get('timetable/personal');
    const { personalTimeTable } = response.data.data;
    dispatch({
      type: SET_PERSONAL_TIMETABLE,
      payload: personalTimeTable.events ? personalTimeTable.events : [],
    });
  } catch (error) {
    console.error(error);
    cogoToast.error(error.response.data.message);
  }
};

//get student clas timetable
export const getStudentClassTimetable = () => async (dispatch) => {
  let resposne;
  try {
    resposne = await API.get('timetable/class');
    const { classTimetable } = resposne.data.data;

    dispatch({
      type: SET_CLASS_TIMETABLE,
      payload: classTimetable.events ? classTimetable.events : [],
    });
  } catch (error) {
    console.error(error);
    cogoToast.error(error.response.data.message);
  }
};

export const addPersonalEvent = (event) => async (dispatch) => {
  let response;
  try {
    response = await API.post('timetable/personal', event);
    const { personalTimeTable } = response.data.data;
    dispatch({
      type: SET_PERSONAL_TIMETABLE,
      payload: personalTimeTable.events ? personalTimeTable.events : [],
    });
  } catch (error) {
    cogoToast.error(error.response.data.message);
  }
};

export const deleteEventFromPersonalTimetable = async (id) => {
  try {
    const respopnse = await API.delete(`timetable/personal?id=${id}`);
    const message = respopnse.data.message;

    cogoToast.success(message);
  } catch (e) {
    cogoToast.error(e.response.data.message);
  }
};
