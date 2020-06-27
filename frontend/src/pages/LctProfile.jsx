import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../components/Navbar';
import API from '../network/api';
import { deleteLecturerAccount } from '../store/actions/authActions';

const LctProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchLecturerInfo = async () => {
      //fetch profile details
      const res = await API.get('auth/me');
      setCurrentUser(res.data.data.lecturer);
    };
    fetchLecturerInfo();
  }, []);

  const editProfile = () => {
    //TODO:verify user email if not verified
    history.push('/lecturer/profile/edit');
  };

  const deleteAccount = async () => {
    if (window.confirm('Are your sure you want to delete your account?')) {
      await deleteLecturerAccount();
    } else {
      return;
    }
  };

  return (
    <React.Fragment>
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
            alt="avatar"
          />
        </div>
        <div className="uk-width-expand">
          <h3 className="uk-text-uppercase">
            {currentUser.fName} {currentUser.lName}
          </h3>
          {/* Show Lecturer Details*/}
          <p>Email - {currentUser.email}</p>
          <p>Phone - {currentUser.phoneNo}</p>
          <p data-uk-margin>
            <button
              className="uk-button uk-button-primary uk-margin-right  uk-margin-large-bottom"
              onClick={editProfile}
            >
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
          <h3>COURSES TAUGHT</h3>
          {/* SHOW THE COUSRES TAUGHT BY THIS LECTURER */}
          <table className="uk-table uk-table-divider">
            <thead>
              <tr>
                <th>COURSE NAME:</th>
                <th>COURSE CODE:</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.courses &&
                currentUser.courses.map((course, i) => (
                  <tr key={i}>
                    <td>{course.name}</td>
                    <td>{course.courseCode}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { deleteLecturerAccount })(LctProfile);
