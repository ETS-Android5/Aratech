import cogoToast from 'cogo-toast';

import API from '../../network/api';
import { SET_COURSES, ADD_COURSE } from './types';

export const getAllCourses = () => async (dispatch) => {
  let response;
  try {
    response = await API.get('courses');

    const { courses } = response.data.data;

    //get the department names and IDs
    const courseNames = courses.map((course) => course.name);
    const courseIDs = courses.map((course) => course._id);

    dispatch({
      type: SET_COURSES,
      payload: { courseNames, courseIDs },
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
      payload: { courseName: course.name, courseID: course._id },
    });
  } catch (error) {
    cogoToast.error(error.response.data.message);
  }
};
