import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string(),
  newPassword: Yup.string(),
  phoneNo: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Must be a valid phone number'
  ),
});

const EditProfile = ({ user }) => {
  const [isLoading, setLoading] = React.useState(false);

  const onUpdateProfile = () => {};

  const onSubmit = () => {};

  return (
    <div className="uk-grid-collapse" data-uk-grid>
      <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center">
        <div className="uk-align-center">
          <img
            className="uk-border-pill uk-display-inline-block uk-margin"
            src={user.avatar}
            width="300"
            height="200"
            alt="Border pill"
          />
          <div className="uk-flex uk-flex-middle">
            <button
              className="uk-button uk-button-primary uk-button-large"
              disabled={isLoading}
              onClick={onUpdateProfile}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>

      {/* Start of the form part */}
      <div
        className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-middle uk-flex-center"
        data-uk-height-viewport
      >
        <div className="uk-width-3-4@s">
          <div className="uk-text-center uk-margin-medium-bottom">
            <h1 className="uk-letter-spacing-small">
              Make Changes To Your Details
            </h1>
          </div>
          <Formik
            initialValues={{ oldPassword: '', newPassword: '', phoneNo: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              //define error that can occur
              // if (error) {
              //   this.setState({
              //     isLoading: false,
              //   });
              //   cogoToast.error(error, {
              //     position: 'top-center',
              //   });
              //reset the fields
              values.oldPassword = '';
              values.newPassword = '';
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
                  <label className="uk-form-label" htmlFor="oldPassword">
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
                    type="password"
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="********"
                    disabled={isLoading}
                  />
                  {touched.oldPassword && errors.oldPassword ? (
                    <p className="uk-text-danger">{errors.oldPassword}</p>
                  ) : null}
                </div>

                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label" htmlFor="newPassword">
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
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="**********"
                    disabled={isLoading}
                  />
                  {touched.newPassword && errors.newPassword ? (
                    <p className="uk-text-danger">{errors.newPassword}</p>
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
                    disabled={isLoading}
                  />
                  {touched.phoneNo && errors.phoneNo ? (
                    <p className="uk-text-danger">{errors.phoneNo}</p>
                  ) : null}
                </div>
                <button
                  className="uk-button uk-button-primary uk-button-large"
                  type="submit"
                  disabled={isLoading}
                  onClick={onSubmit}
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(EditProfile);
