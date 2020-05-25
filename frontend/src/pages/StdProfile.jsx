import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

import API from '../network/api';

const StdProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [department, setDepartment] = useState('');

  useEffect(() => {
    API.get('auth/me').then((res) => {
      setCurrentUser(res.data.data.student);
      setDepartment(res.data.data.student.department.name);
    });
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
            <button className="uk-button uk-button-primary uk-margin-right">
              Edit Profile
            </button>
            <button className="uk-button uk-button-danger">
              Delete Account
            </button>
          </p>
        </div>
        <div className="uk-width-2-5@m"></div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(StdProfile);
