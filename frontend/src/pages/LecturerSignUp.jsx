import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import toaster from 'toasted-notes';

import { signupLecturer } from '../store/actions/authActions';

import Navbar from '../components/Navbar';

//create a validation schema for the form
const lecValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  LastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Must provide email'),
  phoneNo: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Must provide a valid phone number'
    )
    .required('Must provide your phone number'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .max(32, 'Password should not be more than 32 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Must confirm your password')
});

//THIS THE LECTURER'S SIGN UP PAGE
class LecturerSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  async componentDidMount() {
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
    const { history, signupLecturer } = this.props;
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
                <h1 className="uk-letter-spacing-small">
                  Create an Account as a Lecturer
                </h1>
              </div>

              {/* Create a form for a lecturer to fill */}
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  phoneNo: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={lecValidationSchema}
                onSubmit={async values => {
                  this.setState({
                    isLoading: true
                  });
                  //delete the confirm password for it is not needed in the backend
                  delete values.confirmPassword;

                  const err = await signupLecturer(values, history);
                  if (err) {
                    this.setState({
                      isLoading: false
                    });
                    toaster.notify(err, {
                      duration: 5000,
                      position: 'top'
                    });

                    //reset the fields
                    values.firstName = '';
                    values.lastName = '';
                    values.email = '';
                    values.phoneNo = '';
                    values.password = '';
                    values.passwordConfirmation = '';
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
                        First name
                      </label>
                      <input
                        id="name"
                        className={`uk-input uk-form-large ${
                          touched.firstName && errors.firstName
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        placeholder="AraTech"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
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
                      <label className="uk-form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className="uk-input uk-form-large"
                        type="email"
                        placeholder="aratech@gmail.com"
                      />
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="name">
                        Phone
                      </label>
                      <input
                        id="name"
                        name="phoneNo"
                        className="uk-input uk-form-large"
                        type="text"
                        placeholder="+233 547 009 190"
                      />
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        className="uk-input uk-form-large"
                        type="password"
                        placeholder="Min 8 characters"
                      />
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        name="confirmPassword"
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

const matchStateToProps = ({
  auth: { isAuthenticated, isLecturer, isStudent }
}) => ({
  isAuthenticated,
  isLecturer,
  isStudent
});

export default connect(matchStateToProps, { signupLecturer })(
  withRouter(LecturerSignUp)
);
