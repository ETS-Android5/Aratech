import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import cogoToast from 'cogo-toast';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

import { signupStudent } from '../store/actions/authActions';
import { loadAllDepartments } from '../store/actions/departmentActions';

//THIS THE STUDENT SIGN UP PAGE
class StdSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  //create a validation schema for the form
  createValidationSchema = () => {
    return Yup.object().shape({
      fName: Yup.string().required('First Name is required'),
      lName: Yup.string().required('Last Name is required'),
      otherNames: Yup.string(),
      email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
      indexNo: Yup.number('Must be a number')
        .min(1000000, 'Should be at least 7 digits')
        .max(999999999999, 'Should not be more than 8 digits')
        .required('Index No is required'),
      department: Yup.string().oneOf(
        this.props.departmentIDs,
        'Must select a department'
      ),
      phoneNo: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          'Must be a valid phone number'
        )
        .required('Phone number is required'),
      password: Yup.string()
        .min(8, 'Password must be 8 or more characters')
        .max(32, 'Password must not be more than 32 characters')
        .required('Password is required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    });
  };

  async componentDidMount() {
    const {
      isAuthenticated,
      isStudent,
      isLecturer,
      history,
      loadAllDepartments,
    } = this.props;
    //check if user isn't already authenticated
    if (isAuthenticated) {
      //check if user is logged in as student or lecturer
      if (isStudent) {
        history.push('/student/home');
      } else if (isLecturer) {
        history.push('/lecturer/home');
      }
    }

    //load all departments
    await loadAllDepartments();
  }

  render() {
    const {
      history,
      signupStudent,
      departmentNames,
      departmentIDs,
    } = this.props;
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
                  Create an Account as a Student
                </h1>
              </div>

              {/* Create a form for the student to fill */}
              <Formik
                initialValues={{
                  fName: '',
                  lName: '',
                  otherNames: '',
                  email: '',
                  indexNo: '',
                  department: '',
                  phoneNo: '',
                  password: '',
                  passwordConfirmation: '',
                }}
                validationSchema={this.createValidationSchema}
                onSubmit={async (values) => {
                  this.setState({
                    isLoading: true,
                  });
                  //delete confirm password
                  delete values.passwordConfirmation;

                  const error = await signupStudent(values, history);
                  if (error) {
                    this.setState({
                      isLoading: false,
                    });
                    cogoToast.error(error, {
                      position: 'top-center',
                    });
                    //reset the fields
                    values.fName = '';
                    values.lName = '';
                    values.otherNames = '';
                    values.email = '';
                    values.indexNo = '';
                    values.department = '';
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
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="fName">
                        First name
                      </label>
                      <input
                        id="fName"
                        name="fName"
                        className={`uk-input uk-form-large ${
                          touched.fName && errors.fName
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.fName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="AraTech"
                        disabled={isLoading}
                      />
                      {touched.fName && errors.fName ? (
                        <p className="uk-text-danger">{errors.fName}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="lName">
                        Last name
                      </label>
                      <input
                        id="lName"
                        name="lName"
                        className={`uk-input uk-form-large ${
                          touched.lName && errors.lName
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.lName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="AraTech"
                        disabled={isLoading}
                      />
                      {touched.lName && errors.lName ? (
                        <p className="uk-text-danger">{errors.lName}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="otherNames">
                        Other Names (Optional)
                      </label>
                      <input
                        id="otherNames"
                        name="otherNames"
                        className={`uk-input uk-form-large ${
                          touched.otherNames && errors.otherNames
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.otherNames}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="AraTech"
                        disabled={isLoading}
                      />
                      {touched.otherNames && errors.otherNames ? (
                        <p className="uk-text-danger">{errors.otherNames}</p>
                      ) : null}
                    </div>

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
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        placeholder="aratech@gmail.com"
                        disabled={isLoading}
                      />
                      {touched.email && errors.email ? (
                        <p className="uk-text-danger">{errors.email}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="indexNo">
                        Index
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
                        placeholder="9345617"
                        disabled={isLoading}
                      />
                      {touched.indexNo && errors.indexNo ? (
                        <p className="uk-text-danger">{errors.indexNo}</p>
                      ) : null}
                    </div>

                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="department">
                        Program
                      </label>
                      <select
                        id="department"
                        name="department"
                        className={`uk-select uk-form-large ${
                          touched.department && errors.department
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Computer Engineering"
                        disabled={isLoading}
                      >
                        <option value="default">Select your program</option>
                        {departmentIDs.map((department, i) => (
                          <option key={department} value={department}>
                            {departmentNames[i]}
                          </option>
                        ))}
                      </select>
                      {touched.department && errors.department ? (
                        <p className="uk-text-danger">{errors.department}</p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="phoneNo">
                        Phone No
                      </label>
                      <input
                        id="phoneNo"
                        name="phoneNo"
                        className={`uk-input uk-form-large ${
                          touched.phoneNo && errors.phoneNo
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.phoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="233547009190"
                        disabled={isLoading}
                      />
                      {touched.phoneNo && errors.phoneNo ? (
                        <p className="uk-text-danger">{errors.phoneNo}</p>
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
                        placeholder="Password"
                        disabled={isLoading}
                      />
                      {touched.password && errors.password ? (
                        <p className="uk-text-danger">{errors.password}</p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-margin">
                      <label
                        className="uk-form-label"
                        htmlFor="passwordConfirmation"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        className={`uk-input uk-form-large ${
                          touched.passwordConfirmation &&
                          errors.passwordConfirmation
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="password"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm Password"
                        disabled={isLoading}
                      />
                      {touched.passwordConfirmation &&
                      errors.passwordConfirmation ? (
                        <p className="uk-text-danger">
                          {errors.passwordConfirmation}
                        </p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-text-center">
                      <button
                        className="uk-button uk-button-primary uk-button-large"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Registering ...' : 'Sign Up'}
                      </button>
                    </div>
                    <div className="uk-width-1-1 uk-margin uk-text-center">
                      <p className="uk-text-small uk-margin-remove">
                        By signing up you agree to our{' '}
                        <Link
                          className="uk-link-border"
                          to="/terms"
                          disabled={isLoading}
                        >
                          terms
                        </Link>{' '}
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
                  Already signed up, enter your details to Login to your Account
                </p>
              </div>
              <div className="uk-width-1-1 uk-text-center">
                <Link
                  to="/student/signin"
                  disabled={isLoading}
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
  auth: { isAuthenticated, isStudent, isLecturer },
  department: { departmentNames, departmentIDs },
}) => ({
  isAuthenticated,
  isStudent,
  isLecturer,
  departmentNames,
  departmentIDs,
});

export default connect(matchStateToProps, {
  signupStudent,
  loadAllDepartments,
})(withRouter(StdSignUp));
