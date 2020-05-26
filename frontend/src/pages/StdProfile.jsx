import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import API from '../network/api';
import {
  getStudentClassTimetable,
  getStudentPersonalTimetable,
} from '../store/actions/timetableActions';
import { deleteStudentAccount } from '../store/actions/authActions';

const StdProfile = ({
  personalTimetable,
  classTimetable,
  getStudentClassTimetable,
  getStudentPersonalTimetable,
  deleteStudentAccount,
}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [department, setDepartment] = useState('');

  const getClassTable = useRef(getStudentClassTimetable);
  const getPersonalTable = useRef(getStudentPersonalTimetable);

  const deleteAccount = async () => {
    if (window.confirm('Are your sure you want to delete your account?')) {
      await deleteStudentAccount();
    } else {
      return;
    }
  };

  useEffect(() => {
    const fetchStudentInfo = async () => {
      //fetch profile details
      const res = await API.get('auth/me');
      setCurrentUser(res.data.data.student);
      setDepartment(res.data.data.student.department.name);

      //fetch time table information
      await getPersonalTable.current();
      await getClassTable.current();
    };
    fetchStudentInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="uk-height-xlarge uk-padding-large uk-grid-collapse"
        data-uk-grid
      >
        <div className="uk-width-1-5@m uk-align-center">
          <img
            className="uk-border-pill uk-display-inline-block uk-margin"
            src={currentUser.avatar}
            width="200"
            height="200"
            alt="Border pill"
          />
        </div>
        <div className="uk-width-expand">
          <h3 className="uk-text-uppercase">
            {currentUser.fName} {currentUser.lName}
          </h3>
          <p>Index No - {currentUser.indexNo}</p>
          <p>Email - {currentUser.email}</p>
          <p>Department - {department}</p>
          <p data-uk-margin>
            <button className="uk-button uk-button-primary uk-margin-right  uk-margin-large-bottom">
              Edit Profile
            </button>
            <button
              className="uk-button uk-button-danger uk-margin-large-bottom"
              onClick={deleteAccount}
            >
              Delete Account
            </button>
          </p>
        </div>
        <div className="uk-width-2-5@m">
          <h3>NUMBER OF EVENTS</h3>
          <table className="uk-table uk-table-divider">
            <thead>
              <tr>
                <th>Event</th>
                <th>No:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal</td>
                <td>{personalTimetable.length}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td>{classTimetable.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  timetable: { personalTimetable, classTimetable },
}) => ({
  personalTimetable,
  classTimetable,
});

export default connect(mapStateToProps, {
  getStudentClassTimetable,
  getStudentPersonalTimetable,
  deleteStudentAccount,
})(StdProfile);
