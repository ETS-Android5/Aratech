import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import UIKit from 'uikit'
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload'
// import cogoToast from 'cogo-toast';

import Navbar from '../components/Navbar'
import { setStudentProfileImg } from '../store/actions/authActions';

const validationSchema = Yup.object().shape({
   oldPassword: Yup.string()
    .min(8, 'Password must be 8 characters or more')
    .max(32, 'Password cannot be more than 32 characters')
    .required('Old Password is required'),
    newPassword: Yup.string()
    .oneOf([Yup.ref("oldPassword"), null], "Passwords must match")
    .min(8, 'Password must be 8 characters or more')
    .max(32, 'Password cannot be more than 32 characters')
    .required('New Password is required'),
    phoneNo: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Must be a valid phone number"
      )
});

class EditStdProfile extends React.Component{
  constructor(props) {
    super(props)

    this.state={
      image:'',
      isLoading:false,
      uploading:false
    }
  }

  //check the status of the user immediately
  componentDidMount(){
    const { isAuthenticated, isStudent, isLecturer, history} = this.props;
    //check if user isn't already authenticated
    if (isAuthenticated) {
      //check if user is logged in as student or lecturer
      if (isStudent) {
        history.push('/student/profile/edit');
      } else if (isLecturer) {
        history.push('/lecturer/profile/edit');//route not defined yet.
      }
    }
  }
  
  //fxn to update profile pic
  onUpdateProfile=()=>{
    //change profile pic
    const {image,uploading} = this.state;
    console.log(image);
    return (
      <div id="set-avatar" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <h2 className="uk-modal-title">SET YOUR NEW PROFILE PICTURE</h2>
            <p>Only first image will be uploaded</p>
            <ImageUploader
              withIcon={true}
              buttonText="Choose image"
              onChange={this.onFileChange}
              imgExtension={['.jpg', '.png']}
              withPreview={true}
              label="Max file size is 5mb. 
              Accepted image types are .png and .jpg"
              maxFileSize={5242880}
            />
            <button
              className="uk-button uk-button-primary uk-button-large uk-margin-medium-top uk-margin-medium-bottom"
              disabled={!image || uploading}
              onClick={this.uploadImage}
            >
              {uploading ? 'Uploading' : 'Submit'}
            </button>
          </div>
        </div>
    )
  }
 
  onFileChange = (pictureFiles) => {
    this.setState({
      image: pictureFiles[0],
    });
  };

  uploadImage = async () => {
    this.setState({
      uploading: true,
    });
    const isSet = await this.props.setStudentProfileImg(this.state.image);
    if (isSet) {
      UIKit.modal('#set-avatar').hide();
      this.setState({
        uploading: false,
      });
    } else {
      //todo: decide what to do later
    }
  };

  //function to submit changes 
  onSubmitChanges=()=>{
    //submit changes to the backend.
  }

  render(){
    const {isLoading} = this.state
    const {user} = this.props
    return( 
    <React.Fragment>
      <Navbar/>
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
                  onClick={this.onUpdateProfile}
                  >
                  {isLoading ? "Updating..." : "Update"}
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
                <h1 className="uk-letter-spacing-small">Make Changes To Your Details</h1>
              </div>
              <Formik
                initialValues={{ oldPassword :'', newPassword: '',phoneNo:'' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  this.setState({
                    isLoading: true,
                  });
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
                    values.phoneNo='';
                  }
                }
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
                            ? "uk-form-danger"
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
                        onClick={this.onSubmitChanges}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </button>
                  </form>
                )}
              </Formik>
            </div>    
          </div>
      </div>
    </React.Fragment>
    )  
  }
} 

const matchStateToProps = ({
  auth: { isAuthenticated, isStudent, isLecturer,user },
}) => ({
  isAuthenticated,
  isStudent,
  isLecturer,
  user
});

export default connect(matchStateToProps, { setStudentProfileImg })(
  withRouter(EditStdProfile)
);