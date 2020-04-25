import React, { Component } from 'react';
import cogoToast from 'cogo-toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';

import API from '../network/api';

import Navbar from '../components/Navbar';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isLoading: false
    };
  }

  async componentDidMount() {
    const token = this.props.match.params.token;

    if (!token) {
      //there's no token
      cogoToast.error('Must provide a password reset token!');
      this.props.history.push('/');
    } else {
      this.setState({
        token
      });
    }
  }

  validationSchema = () => {
    return Yup.object().shape({
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters or more')
        .max(32, 'Password cannot be more thant 32 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Confirm password is required')
    });
  };

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
              <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={this.validationSchema}
                onSubmit={async ({ password }) => {
                  this.setState({
                    isLoading: true
                  });
                  let response;
                  try {
                    response = await API.post(
                      `/auth/resetpassword?token=${this.state.token}`,
                      {
                        password
                      }
                    );
                    const { message } = response.data;

                    //display the success message
                    cogoToast.success(message);

                    //redirect the user to the landing page
                    this.props.history.push('/');
                  } catch (err) {
                    const errMessage = err.response.data.message;
                    cogoToast.error(errMessage);
                    this.setState({
                      isLoading: false
                    });
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        className={`uk-input uk-form-large ${
                          touched.password && errors.password
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={this.state.isLoading}
                      />
                      {touched.password && errors.password ? (
                        <p className="uk-text-danger">{errors.password}</p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`uk-input uk-form-large ${
                          touched.confirmPassword && errors.confirmPassword
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="password"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={this.state.isLoading}
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <p className="uk-text-danger">
                          {errors.confirmPassword}
                        </p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-text-center">
                      <button
                        className="uk-button uk-button__animate uk-button-primary uk-button-large"
                        type="submit"
                        disabled={this.state.isLoading}
                      >
                        Reset Password
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

export default withRouter(ResetPassword);
