import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';

const EditProfile = ({ user }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [showEditPassword, setShowEditPassword] = React.useState(false);

  const onUpdateProfile = () => {};

  const showEP = () => {
    setShowEditPassword(!showEditPassword);
  };

  return (
    <>
      <Navbar />
      <div className="uk-grid-collapse" data-uk-grid>
        <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-column uk-flex-middle uk-flex-center">
          <div className="uk-align-center uk-width-1-1">
            <img
              className="uk-border-pill uk-display-inline-block uk-margin"
              src={user.avatar}
              width="300"
              height="200"
              alt="Border pill"
            />
            <button
              className="uk-button uk-button-primary uk-button-large uk-width-2-3 uk-text-center uk-margin"
              disabled={isLoading}
              onClick={onUpdateProfile}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
            <button
              className="uk-button uk-button-secondary uk-button-large uk-width-2-3 uk-text-center uk-margin"
              disabled={isLoading}
              onClick={showEP}
            >
              Change Password
            </button>
          </div>
          {showEditPassword && (
            <div className="uk-width-1-1">
              <Formik
                initialValues={{ oldPassword: '', newPassword: '' }}
                validationSchema={Yup.object().shape({
                  oldPassword: Yup.string().required(
                    'Old Password is required'
                  ),
                  newPassword: Yup.string()
                    .min(8, 'New password must be at least 8 characters')
                    .max(32, 'New password cannot be more than 32 characters')
                    .required('New password is required'),
                })}
              >
                {({
                  onSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  errors,
                  values,
                }) => (
                  <form onSubmit={onSubmit}>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="phoneNo">
                        Old Password
                      </label>
                      <input
                        id="oldPassword"
                        name="oldPassword"
                        className={`uk-input uk-form-large ${
                          touched.oldPassword && errors.oldPassword
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                      />
                      {touched.oldPassword && errors.oldPassword ? (
                        <p className="uk-text-danger">{errors.oldPassword}</p>
                      ) : null}
                    </div>
                    <div className="uk-width-1-1 uk-margin">
                      <label className="uk-form-label" htmlFor="phoneNo">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        className={`uk-input uk-form-large ${
                          touched.newPassword && errors.newPassword
                            ? 'uk-form-danger'
                            : null
                        }`}
                        type="text"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                      />
                      {touched.newPassword && errors.newPassword ? (
                        <p className="uk-text-danger">{errors.newPassword}</p>
                      ) : null}
                    </div>
                    <button
                      className="uk-button uk-button-primary uk-width-1-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          )}
        </div>

        {/* Start of the form part */}
        <div
          className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center"
          data-uk-height-viewport
        >
          <div className="uk-width-3-4@s">
            <div className="uk-text-center uk-margin-medium-bottom">
              <h3 className="uk-letter-spacing-small">
                Change Your Phone Number
              </h3>
            </div>
            <Formik
              initialValues={{ phoneNo: '' }}
              validationSchema={Yup.object().shape({
                phoneNo: Yup.string()
                  .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    'Must be a valid phone number'
                  )
                  .required('Phone number is required'),
              })}
              onSubmit={async (values) => {
                setLoading(true);
                //reset the fields
                values.phoneNo = '';
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
                      disabled={isLoading}
                    />
                    {touched.phoneNo && errors.phoneNo ? (
                      <p className="uk-text-danger">{errors.phoneNo}</p>
                    ) : null}
                  </div>
                  <button
                    className="uk-button uk-button-primary uk-button-large uk-width-1-1 uk-text-center"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(EditProfile);
