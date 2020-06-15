import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import cogoToast from 'cogo-toast';
import * as Yup from 'yup';

import Navbar from '../components/Navbar';

import { signinLecturer } from '../store/actions/authActions';

//Create a schema to validate the lecturer using Yup.
const lecValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more')
    .max(32, 'Password cannot be more than 32 characters')
    .required('Must provide password'),
});
class LecturerSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const { isAuthenticated, isStudent, isLecturer, history } = this.props;
    //check if user isn't already authenticated
    if (isAuthenticated) {
      //check if user is logged in as student or lecturer
      if (isLecturer) {
        history.push('/lecturer/home');
      } else if (isStudent) {
        history.push('/student/home');
      }
    }
  }

  render() {
    const { history, signinLecturer } = this.props;
    const { isLoading } = this.state;
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
                <h1 className="uk-letter-spacing-small">Sign In</h1>
              </div>

              {/* lecturer sign in forms */}
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={lecValidationSchema}
                onSubmit={async (values) => {
                  this.setState({ isLoading: true });
                  const err = await signinLecturer(values, history);
                  if (err) {
                    this.setState({ isLoading: false });
                    cogoToast.error(err, {
                      position: 'top-center',
                    });

                    //now reset the fields to their initial values
                    values.email = '';
                    values.password = '';
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className={`uk-input uk-form-large ${
                          touched.email && errors.email
                            ? 'uk-form-danger'
                            : null
                        } `}
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        placeholder="group.aratech@gmail.com"
                      />

                      {/* the text after the input */}
                      {touched.email && errors.email ? (
                        <p className="uk-text-danger">{errors.email}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="password">
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
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="**********"
                        disabled={isLoading}
                      />
                      {touched.password && errors.password ? (
                        <p className="uk-text-danger">{errors.password}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-text-center">
                      <div className="uk-margin-small uk-text-left">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                      </div>
                      <button
                        className="uk-button uk-button__animate uk-button-primary uk-button-large"
                        type="submit"
                        disabled={isLoading}
                      >
                        Sign In
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
                  to="/lecturer/signup"
                  className="uk-button uk-button-success-outline uk-button-large"
                  disabled={isLoading}
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

const mapStateToProps = ({
  auth: { isAuthenticated, isStudent, isLecturer },
}) => ({
  isAuthenticated,
  isStudent,
  isLecturer,
});

export default connect(mapStateToProps, { signinLecturer })(
  withRouter(LecturerSignIn)
);
