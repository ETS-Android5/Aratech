import API from '../../network/api';
import { LOAD_DEPARTMENTS } from './types';

export const loadAllDepartments = () => async dispatch => {
  let departments;
  try {
    const response = await API.get('departments');

    departments = response.data.data.departments;

    //get the department names
    const departmentNames = departments.map(department => department.name);
    const departmentIDs = departments.map(department => department._id);

    //set the departments to redux
    dispatch({
      type: LOAD_DEPARTMENTS,
      payload: { departmentNames, departmentIDs }
    });
  } catch (error) {
    return error.response.data.message;
  }
};
