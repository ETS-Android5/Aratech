import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import UIKit from 'uikit';
import { useHistory } from 'react-router-dom';

import Navbar from '../components/Navbar';
import API from '../network/api';
import {
  changeUserPassword,
  setLecturerProfileImg,
} from '../store/actions/authActions';

const EditLctprofile = ({ changeUserPassword, setLecturerProfileImg }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [showEditPassword, setShowEditPassword] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await API.get('auth/me');
      setCurrentUser(res.data.data.lecturer);
    };
    fetchUser();
  }, []);

  const showEP = () => {
    setShowEditPassword(!showEditPassword);
  };

  const updateProfile = () => {
    UIKit.modal('#set-avatar', {
      bgClose: true,
      escClose: true,
      modal: true,
      keyboard: true,
    }).show();
  };

  const onFileChange = (pictureFiles) => {
    setImage(pictureFiles[0]);
  };

  const uploadImage = async () => {
    setUploading(true);
    await setLecturerProfileImg(image);

    UIKit.modal('#set-avatar').hide();

    setLoading(false);

    //reload page
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="uk-grid-collapse" data-uk-grid>
        <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-column uk-flex-middle uk-flex-center">
          <div className="uk-align-center uk-width-1-1 uk-text-center">
            <img
              className="uk-border-pill uk-display-inline-block uk-margin"
              src={currentUser.avatar}
              width="300"
              height="200"
              alt="Border pill"
            />
            <button
              className="uk-button uk-button-primary uk-button-large uk-width-2-3 uk-text-center uk-margin"
              disabled={isLoading}
              onClick={updateProfile}
            >
              {isLoading ? 'Updating..' : 'Update Image'}
            </button>
          </div>
        </div>
        {/* Other half part  */}
        <div
          className="uk-width-1-2@m uk-padding-large uk-flex"
          data-uk-height-viewport
        >
          <div className="uk-width-3-4@s">
            <div className="uk-text-center uk-margin-small-bottom">
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
            <div className="uk-text-center uk-margin-top">
              <button
                className="uk-button uk-button-secondary uk-button-large uk-width-1-1 uk-text-center uk-margin"
                disabled={isLoading}
                onClick={showEP}
              >
                Change Password
              </button>
              {showEditPassword && (
                <div className="uk-width-1-1 uk-text-left">
                  <Formik
                    initialValues={{
                      oldPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    }}
                    validationSchema={Yup.object().shape({
                      oldPassword: Yup.string().required(
                        'Old Password is required'
                      ),
                      newPassword: Yup.string()
                        .min(8, 'New password must be at least 8 characters')
                        .max(
                          32,
                          'New password cannot be more than 32 characters'
                        )
                        .required('New password is required'),
                      confirmPassword: Yup.string()
                        .oneOf(
                          [Yup.ref('newPassword'), null],
                          'Passwords must match'
                        )
                        .required('Confirm password is required'),
                    })}
                    onSubmit={async (values) => {
                      setLoading(true);
                      await changeUserPassword({
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                      });
                      setLoading(false);

                      // reset the values
                      values.newPassword = '';
                      values.oldPassword = '';
                      values.confirmPassword = '';
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      touched,
                      errors,
                      values,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="uk-width-1-1 uk-margin">
                          <label
                            className="uk-form-label uk-text-left"
                            htmlFor="oldPassword"
                          >
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
                            disabled={isLoading}
                          />
                          {touched.oldPassword && errors.oldPassword ? (
                            <p className="uk-text-danger">
                              {errors.oldPassword}
                            </p>
                          ) : null}
                        </div>
                        <div className="uk-width-1-1 uk-margin">
                          <label
                            className="uk-form-label uk-text-bold uk-text-left"
                            htmlFor="newPassword"
                          >
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
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isLoading}
                          />
                          {touched.newPassword && errors.newPassword ? (
                            <p className="uk-text-danger">
                              {errors.newPassword}
                            </p>
                          ) : null}
                        </div>
                        <div className="uk-width-1-1 uk-margin">
                          <label className="uk-form-label" htmlFor="phoneNo">
                            Confirm New Password
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
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isLoading}
                          />
                          {touched.confirmPassword && errors.confirmPassword ? (
                            <p className="uk-text-danger">
                              {errors.confirmPassword}
                            </p>
                          ) : null}
                        </div>
                        <button
                          className="uk-button uk-button-primary uk-button-large uk-width-1-1"
                          type="submit"
                          disabled={isLoading}
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
        <h3 style={{ marginTop: '-50px' }} className="uk-align-center">
          <p>
            CLICK{' '}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push('/lecturer/profile');
              }}
              className="uk-text-primary"
            >
              HERE{' '}
            </span>
            TO VIEW PROFILE
          </p>
        </h3>
      </div>

      {/** modal to set user profile picture */}
      <div id="set-avatar" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <h2 className="uk-modal-title">CHANGE YOUR PROFILE PICTURE</h2>
          <p>Only first image will be uploaded</p>
          <ImageUploader
            withIcon={true}
            buttonText="Choose image"
            onChange={onFileChange}
            imgExtension={['.jpg', '.png']}
            withPreview={true}
            label="Max file size is 5mb. 
              Accepted image types are .png and .jpg"
            maxFileSize={5242880}
          />
          <button
            className="uk-button uk-button-primary uk-button-large uk-margin-medium-top uk-margin-medium-bottom"
            disabled={!image || uploading}
            onClick={uploadImage}
          >
            {uploading ? 'Uploading' : 'Submit'}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, {
  changeUserPassword,
  setLecturerProfileImg,
})(EditLctprofile);
