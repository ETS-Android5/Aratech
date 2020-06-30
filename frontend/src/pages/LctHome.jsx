import React from 'react';
import { connect } from 'react-redux';
import ImageUpload from 'react-images-upload';
import UIKit from 'uikit';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../components/Navbar';
import {
  createNewCourse,
  getAllCourses,
  addCourseForLecturer,
} from '../store/actions/courseActions';
import { setLecturerProfileImg } from '../store/actions/authActions';
import FileUpload from '../components/FileUpload';
import API from '../network/api';
import cogoToast from 'cogo-toast';

const localizer = momentLocalizer(moment);

const Home = ({
  createNewCourse,
  getAllCourses,
  addCourseForLecturer,
  setLecturerProfileImg,
  courseNames,
  courseIDs,
  user,
  history,
}) => {
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [course, selectCourse] = React.useState('');
  const [courseName, setCourseName] = React.useState('');
  const [courseCode, setCourseCode] = React.useState('');
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

    //set lecturer course
    const isSet = await setLecturerProfileImg(image);
    await addCourseForLecturer(course);
    if (isSet) {
      UIKit.modal('#set-avatar').hide();
      setLoading(false);
    } else {
      //todo: decide what to do later
    }
  };

  const createAssignment = async ({ file, deadline }) => {
    const res = await API.get('auth/me');
    const courses = res.data.data.lecturer.courses;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('deadline', deadline);

    try {
      await API.post(`assignments/${courses[0]._id}`, formData);
      cogoToast.success(
        `Assignment created for course ${course.name} successfully`
      );
    } catch (error) {
      cogoToast.error(error.response.data.message);
    }
  };

  const onFileChange = (images) => {
    setImage(images[0]);
  };

  const onCourseChange = (e) => {
    selectCourse(e.target.value);
  };

  const onCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };
  const onCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  };

  const createCourse = async () => {
    setLoading(true);
    if (!courseName || !courseCode) {
      window.alert('Course name and course code are both needed');
      setLoading(false);
      return;
    }

    try {
      await createNewCourse({ name: courseName, courseCode: courseCode });
    } catch (error) {
      setLoading(false);
    }
    setCourseCode('');
    setCourseName('');
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="uk-grid-collapse" data-uk-grid>
        <div className="uk-width-1-2@m uk-padding-small uk-flex uk-flex-middle uk-flex-center">
          {
            <Calendar
              localizer={localizer}
              events={[]}
              titleAccessor="eventName"
              startAccessor="startTime"
              endAccessor="endTime"
              views={['day', 'week', 'agenda']}
              defaultView={'day'}
              onSelectEvent={(event) => this.showEventDetails(event)}
            />
          }
        </div>

        <div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-column">
          {/* show profile pic and upcoming class on this card */}
          <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
            <img
              onClick={() => history.push('/lecturer/profile')}
              src={user.avatar}
              className="uk-border-circle"
              alt="avatar"
              style={{
                width: '100px',
                height: '100px',
                cursor: 'pointer',
              }}
            />
            <h4>Upcoming Class</h4>

            <FileUpload upload={createAssignment} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://lm-forum.herokuapp.com"
            >
              <h4>Enter Live Chat</h4>
            </a>
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
          <h3 className="uk-modal-title">
            SET YOUR PROFILE PICTURE AND COURSE
          </h3>
          <p>Only first image will be uploaded</p>
          <ImageUpload
            withIcon={true}
            buttonText="Choose image"
            onChange={onFileChange}
            imgExtension={['.jpg', '.png']}
            withPreview={true}
            label="Max file size is 5mb. 
              Accepted image types are .png, .jpeg and .jpg"
            maxFileSize={5242880}
          />
          <select
            id="courses"
            name="courses"
            className={`uk-select uk-form-large`}
            type="text"
            placeholder="Computer Engineering"
            value={course}
            onChange={onCourseChange}
            disabled={uploading || isLoading}
          >
            <option value="default">Select a course</option>
            {courseIDs.map((course, i) => (
              <option key={course} value={course}>
                {courseNames[i]}
              </option>
            ))}
          </select>
          <input
            id="courseName"
            name="courseName"
            className="uk-input uk-form-large uk-margin-medium-top"
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={onCourseNameChange}
            disabled={isLoading}
          />
          <input
            id="courseCode"
            name="courseCode"
            className="uk-input uk-form-large"
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={onCourseCodeChange}
            disabled={isLoading}
          />
          <button
            className="uk-button uk-button-primary uk-button-large uk-margin-top uk-margin-medium-bottom"
            onClick={createCourse}
          >
            Create a new course
          </button>{' '}
          <br />
          <button
            className="uk-button uk-button-primary uk-button-large uk-margin-medium-top uk-margin-medium-bottom"
            disabled={!image || uploading || !course || course === 'default'}
            onClick={uploadImage}
          >
            {uploading ? 'Uploading' : 'Submit'}
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  auth: { user },
  course: { courseNames, courseIDs },
}) => ({
  user,
  courseNames,
  courseIDs,
});

export default connect(mapStateToProps, {
  getAllCourses,
  createNewCourse,
  addCourseForLecturer,
  setLecturerProfileImg,
})(Home);
