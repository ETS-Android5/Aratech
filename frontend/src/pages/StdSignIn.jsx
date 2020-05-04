import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import cogoToast from 'cogo-toast';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

import { signinStudent } from '../store/actions/authActions';

const validationSchema = Yup.object().shape({
  indexNo: Yup.number('Must be a number')
    .min(1000000, 'Should be at least 7 digits')
    .max(99999999, 'Should not be more than 8 digits')
    .required('Index No is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more')
    .max(32, 'Password cannot be more than 32 characters')
    .required('Password is required'),
});

//THIS IS THE STUDENT SIGN IN PAGE
class StdSignIn extends React.Component {
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
      if (isStudent) {
        history.push('/student/home');
      } else if (isLecturer) {
        history.push('/lecturer/home');
      }
    }
  }

  render() {
    const { history, signinStudent } = this.props;
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
              <Formik
                initialValues={{ indexNo: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  this.setState({
                    isLoading: true,
                  });
                  const error = await signinStudent(values, history);
                  if (error) {
                    this.setState({
                      isLoading: false,
                    });
                    cogoToast.error(error, {
                      position: 'top-center',
                    });
                    //reset the fields
                    values.indexNo = '';
                    values.password = '';
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
                        Index No
                      </label>
                      <input
                        id="indexNo"
                        name="indexNo"
                        className={`uk-input uk-form-large ${
                          touched.indexNo && errors.indexNo
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.indexNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="9346517"
                        disabled={isLoading}
                      />
                      {touched.indexNo && errors.indexNo ? (
                        <p className="uk-text-danger">{errors.indexNo}</p>
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
                        {isLoading ? 'Signing in...' : 'Sign In'}
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
                  to="/student/signup"
                  disabled={isLoading}
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

const matchStateToProps = ({
  auth: { isAuthenticated, isStudent, isLecturer },
}) => ({
  isAuthenticated,
  isStudent,
  isLecturer,
});

export default connect(matchStateToProps, { signinStudent })(
  withRouter(StdSignIn)
);
