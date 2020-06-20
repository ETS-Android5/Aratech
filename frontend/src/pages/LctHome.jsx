import React from 'react';
import { connect } from 'react-redux';
import ImageUploader from 'react-images-upload';
import UIKit from 'uikit';

import Navbar from '../components/Navbar';
import { createNewCourse, getAllCourses } from '../store/actions/courseActions';

const Home = ({ createNewCourse, getAllCourses, courses, user }) => {
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  React.useEffect(() => {
    const getCourses = async () => {
      await getAllCourses();
    };

    getCourses();

    if ((user.courses && user.courses.length) || user.avatar) {
    } else {
      UIKit.modal('#set-avatar', {
        bgClose: false,
        escClose: false,
        modal: false,
        keyboard: false,
      }).show();
    }
  }, [getAllCourses, user]);

  const uploadImage = async () => {
    setUploading(true);
  };

  const onFileChange = (images) => {
    setImage(images[0]);
  };

  return (
    <>
      <Navbar />
      <div className="uk-grid-collapse" data-uk-grid>
        <div className="uk-width-1-2@m uk-padding-small uk-flex uk-flex-middle uk-flex-center">
          {/* <Calendar
            localizer={localizer}
            events={events}
            titleAccessor="eventName"
            startAccessor="startTime"
            endAccessor="endTime"
            views={['day', 'week', 'agenda']}
            defaultView={'day'}
            onSelectEvent={(event) => this.showEventDetails(event)}
          /> */}
        </div>

        <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-column">
          {/* show profile pic and upcoming class on this card */}
          <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
            <img
              src="../assets/students"
              className="uk-border-circle"
              alt="avatar"
              style={{
                width: '100px',
                height: '100px',
                cursor: 'pointer',
              }}
            />
            <h4>Upcoming Class</h4>
          </div>

          {/* show the list of student here */}
          <div className="uk-margin-top uk-padding-small">
            <h3>STUDENTS LIST</h3>
            <table className="uk-table uk-table-divider uk-table-expand">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Index Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clifford Owusu Amponsah</td>
                  <td>9346517</td>
                </tr>
                <tr>
                  <td>Doe Godfred</td>
                  <td>9346517</td>
                </tr>
                <tr>
                  <td>Gyimah Francis</td>
                  <td>9343317</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="set-avatar" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <h2 className="uk-modal-title">SET YOUR PROFILE PICTURE</h2>
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
    </>
  );
};

const mapStateToProps = ({ auth: { user }, course: { courses } }) => ({
  user,
  courses,
});

export default connect(mapStateToProps, { getAllCourses, createNewCourse })(
  Home
);
