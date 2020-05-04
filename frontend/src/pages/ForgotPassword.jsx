import React, { Component } from 'react';
import { Formik } from 'formik';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';

import Navbar from '../components/Navbar';

import { forgotPassword } from '../store/actions/authActions';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
});

class ForgotPassword extends Component {
  render() {
    const { history } = this.props;
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
                  Enter Email to reset your password
                </h3>
              </div>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  const error = await forgotPassword(values.email, history);
                  if (error) {
                    cogoToast.error(error, {
                      position: 'top-center',
                    });
                  }
                }}
              >
                {({
                  values,
                  handleSubmit,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className={`uk-input uk-form-large ${
                          touched.email && errors.email
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="group.aratech@gmail.com"
                      />
                      {touched.email && errors.email ? (
                        <p className="uk-text-danger">{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-text-center">
                      <button
                        type="submit"
                        className="uk-button uk-button__animate uk-button-primary uk-button-large"
                      >
                        Send password reset email
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
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
                  data-uk-toggle="#signup-modal"
                  to=""
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

export default withRouter(ForgotPassword);
