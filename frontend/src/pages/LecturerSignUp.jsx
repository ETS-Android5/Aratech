import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

//THIS THE STUDENT SIGN UP PAGE
class LecturerSignUp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="uk-grid-collapse" data-uk-grid>
          <div
            className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center"
            data-uk-height-viewport
          >
            <div className="uk-width-3-4@s">
              <div className="uk-text-center uk-margin-bottom">
                <Link className="uk-logo uk-text-success uk-text-bold" to="/">
                  Lecture Monitor
                </Link>
              </div>
              <div className="uk-text-center uk-margin-medium-bottom">
                <h1 className="uk-letter-spacing-small">
                  Create an Account as a Lecturer
                </h1>
              </div>

              {/* Create a form for the student to fill */}
              <form>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    First name
                  </label>
                  <input
                    id="name"
                    className="uk-input uk-form-large"
                    type="text"
                    placeholder="AraTech"
                  />
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Last name
                  </label>
                  <input
                    id="name"
                    className="uk-input uk-form-large"
                    type="text"
                    placeholder="AraTech"
                  />
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Department
                  </label>
                  <input
                    id="name"
                    className="uk-input uk-form-large"
                    type="text"
                    placeholder="Computer Engineering"
                  />
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Staff ID
                  </label>
                  <input
                    id="name"
                    className="uk-input uk-form-large"
                    type="text"
                    placeholder="9345617"
                  />
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="uk-input uk-form-large"
                    type="email"
                    placeholder="aratech@gmail.com"
                  />
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Phone
                  </label>
                  <input
                    id="name"
                    className="uk-input uk-form-large"
                    type="text"
                    placeholder="+233 547 009 190"
                  />
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="password">
                    Password
                  </label>
                  <input
                    id="password"
                    className="uk-input uk-form-large"
                    type="password"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div className="uk-width-1-1 uk-text-center">
                  <button className="uk-button uk-button-primary uk-button-large">
                    Sign Up
                  </button>
                </div>
                <div className="uk-width-1-1 uk-margin uk-text-center">
                  <p className="uk-text-small uk-margin-remove">
                    By signing up you agree to our{' '}
                    <a className="uk-link-border" href="#">
                      terms
                    </a>{' '}
                    of service.
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div
            className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center uk-light
    uk-background-cover uk-background-norepeat uk-background-blend-overlay uk-background-primary"
            data-uk-height-viewport
          >
            <div>
              <div className="uk-text-center">
                <h2 className="uk-h1 uk-letter-spacing-small">Welcome Back</h2>
              </div>
              <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
                <p>
                  Already signed up? , enter your details to Login to your
                  Account
                </p>
              </div>
              <div className="uk-width-1-1 uk-text-center">
                <Link
                  to="/lecturer/signin"
                  className="uk-button uk-button-success-outline uk-button-large"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LecturerSignUp;
