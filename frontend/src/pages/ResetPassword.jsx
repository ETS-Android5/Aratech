import React, { Component } from 'react';

import Navbar from '../components/Navbar';

class ResetPassword extends Component {
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
              <div className="uk-text-center uk-margin-medium-bottom">
                <h3 className="uk-letter-spacing-small">
                  Enter Your new Password
                </h3>
              </div>

              <form>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Password
                  </label>
                  <input
                    id="idEmail"
                    className="uk-input uk-form-large"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" for="name">
                    Confirm Password
                  </label>
                  <input
                    id="idEmail"
                    className="uk-input uk-form-large"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="uk-width-1-1 uk-text-center">
                  <button className="uk-button uk-button__animate uk-button-primary uk-button-large">
                    Reset Password
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
                <a
                  href="sign-up.html"
                  className="uk-button uk-button-success-outline uk-button-large"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
