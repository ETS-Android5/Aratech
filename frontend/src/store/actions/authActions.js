import API from '../../network/api';
import setAuthToken from '../../network/setAuthToken';
import { SET_CURRENT_USER } from './types';

//sign in student
export const signinStudent = (user, history) => async dispatch => {
  let response;
  try {
    response = await API.post('auth/students/login', user);

    const { student, token } = response.data.data;

    //set the current user to redux store
    dispatch({
      type: SET_CURRENT_USER,
      isStudent: true,
      isLecturer: false,
      payload: student
    });

    //save the token to localstorage
    localStorage.setItem('lm-student-token', token);

    //set authorization header for axios
    setAuthToken(token);

    //redirect the user to the authenticated page
    history.push('/protectedroute');
  } catch (err) {
    return err.response.data.message;
  }
};

//log out user
export const logoutUser = () => dispatch => {
  //remove tokens from localstorage
  localStorage.removeItem('lm-student-token');
  localStorage.removeItem('lm-lecturer-token');

  //remove axios authorization header
  setAuthToken(false);

  //remove current user from redux store
  dispatch({
    type: SET_CURRENT_USER,
    isLecturer: false,
    isStudent: false,
    payload: null
  });
};

export const setCurrentStudent = decoded => dispatch => {};

export const setCurrentLecturer = decoded => dispatch => {};
