import cogoToast from 'cogo-toast';

import API from '../../network/api';
import { SET_COURSES, ADD_COURSE } from './types';

export const getAllCourses = () => async (dispatch) => {
  let response;
  try {
    response = await API.get('courses');

    const { courses } = response.data.data;
    dispatch({
      type: SET_COURSES,
      payload: courses,
    });
  } catch (error) {
    cogoToast.error(error.response.data.message);
  }
};

export const createNewCourse = (data) => async (dispatch) => {
  let response;
  try {
    response = await API.post('courses', data);

    const { course } = response.data.data;
    cogoToast.success(
      `Course with course code ${course.courseCode} created successfully`
    );

    dispatch({
      type: ADD_COURSE,
      payload: course,
    });
  } catch (error) {
    cogoToast.error(error.response.data.message);
  }
};
