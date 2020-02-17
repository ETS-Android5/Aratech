import React from 'react';

import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

//THIS IS THE STUDENT SIGN IN PAGE
class StdSignIn extends React.Component {
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
                <h1 className="uk-letter-spacing-small">Sign In</h1>
              </div>

              <form>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Index No
                  </label>
                  <input
                    id="name"
                    className="uk-input uk-form-large"
                    type="text"
                    placeholder="9346517"
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
                    placeholder="**********"
                  />
                </div>
                <div className="uk-width-1-1 uk-margin uk-text-center">
                  <Link
                    className="uk-text-small uk-link-muted"
                    to="/forgotpassword"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="uk-width-1-1 uk-text-center">
                  <button className="uk-button uk-button__animate uk-button-primary uk-button-large">
                    Sign In
                  </button>
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
                <h2 className="uk-h1 uk-letter-spacing-small">
                  Hello There, Join Us and Lets monitor your lectures for you.
                </h2>
              </div>
              <div className="uk-margin-top uk-margin-medium-bottom uk-text-center">
                <p>Enter your personal details and join us</p>
              </div>
              <div className="uk-width-1-1 uk-text-center">
                <Link
                  to="/student/signup"
                  className="uk-button uk-button-success-outline uk-button-large"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StdSignIn;
