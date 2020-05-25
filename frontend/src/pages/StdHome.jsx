import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UIKit from 'uikit';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ImageUploader from 'react-images-upload';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DateTimePicker from 'react-datetime-picker';
import SweetAlert from 'react-bootstrap-sweetalert';

import Navbar from '../components/Navbar';
import { setStudentProfileImg } from '../store/actions/authActions';
import {
  getStudentPersonalTimetable,
  getStudentClassTimetable,
  addPersonalEvent,
  deleteEventFromPersonalTimetable,
} from '../store/actions/timetableActions';
import isEmpty from '../validations/isEmpty';
import { dailyEvents, weeklyEvents } from '../utils/timetable-utils';

//use moment as defaullt localizer for calendar
const localizer = momentLocalizer(moment);

//validation schema
const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event Name is required'),
  startTime: Yup.date('Must be a date').required(),
  endTime: Yup.date('Must be a date').required(),
  repeatDaily: Yup.boolean(),
  repeatWeekly: Yup.boolean(),
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      events: [],
      upcomingEvents: [],
      onGoingEvents: [],
      uploading: false,
      isLoading: false,
      currentEvent: null,
      show: false,
    };
  }

  async componentDidMount() {
    //verify if user has a profile image, if not set one
    if (!this.props.user.avatar) {
      UIKit.modal('#set-avatar', {
        bgClose: false,
        escClose: false,
        modal: false,
        keyboard: false,
      }).show();
    }

    //load personal timetable
    try {
      await this.props.getStudentPersonalTimetable();
      const personalTimetable = this.props.personalTimetable;
      let events = [];
      personalTimetable.map((event) => {
        if (event.eventId.repeatDaily) {
          events.push(...dailyEvents(event));
        } else if (event.eventId.repeatWeekly) {
          events.push(...weeklyEvents(event));
        } else {
          const _event = { ...event.eventId };
          _event.startTime = new Date(_event.startTime);
          _event.endTime = new Date(_event.endTime);
          events.push(_event);
        }

        return null;
      });
      this.setState({
        events: [...this.state.events, ...events],
      });
    } catch (error) {
      console.error(error);
    }

    //load class timetable
    try {
      await this.props.getStudentClassTimetable();
      const events = this.props.classTimetable;
      this.setState({
        events: events ? this.state.events.concat(events) : this.state.events,
      });
    } catch (error) {
      console.error(error);
    }

    //set upcoming events
    const upcomingEvents = this.state.events.filter(
      (event) =>
        event.startTime - Date.now() < 10800000 &&
        event.startTime - Date.now() > 0
    );
    this.setState({
      upcomingEvents,
    });

    //load ongoing events
    const onGoingEvents = this.state.events.filter(
      (event) =>
        event.startTime - Date.now() <= 0 && event.endTime - Date.now() > 0
    );
    this.setState({
      onGoingEvents,
    });
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

  //function to show event details
  showEventDetails = (event) => {
    this.setState({
      show: true,
      currentEvent: event,
    });
  };

  deletePersonalEvent = (id) => {
    this.setState({
      show: false,
    });
    setTimeout(async () => {
      if (window.confirm(`Are you sure you want to delete this event?`)) {
        try {
          await deleteEventFromPersonalTimetable(id);
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      }
    }, 1000);
  };

  render() {
    const {
      events,
      upcomingEvents,
      onGoingEvents,
      image,
      uploading,
      isLoading,
      currentEvent,
      show,
    } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {/**calendar component */}
        <div className="uk-grid-collapse" data-uk-grid>
          <div className="uk-width-3-4@m uk-padding-small uk-flex uk-flex-middle uk-flex-center">
            <Calendar
              localizer={localizer}
              events={events}
              titleAccessor="eventName"
              startAccessor="startTime"
              endAccessor="endTime"
              views={['day', 'week', 'agenda']}
              defaultView={'day'}
              onSelectEvent={(event) => this.showEventDetails(event)}
            />
          </div>
          <div className="uk-width-1-4@m uk-margin-top">
            <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
              <img
                onClick={() => this.props.history.push('/student/profile')}
                src={this.props.user.avatar}
                alt="avatar"
                className="uk-border-circle"
                style={{
                  width: '100px',
                  height: '100px',
                  cursor: 'pointer',
                }}
              />
              <h4>Upcoming events</h4>
              {isEmpty(upcomingEvents) ? (
                <p>No Upcoming Events now...</p>
              ) : null}
              <ul>
                {upcomingEvents.map((event) => (
                  <li key={event._id}>{event.eventName}</li>
                ))}
              </ul>
              <h4>Ongoing events</h4>
              {isEmpty(onGoingEvents) ? <p>No Ongoing Events now...</p> : null}
              <ul>
                {onGoingEvents.map((event) => (
                  <li key={event._id}>{event.eventName}</li>
                ))}
              </ul>
            </div>
            <h5 className="uk-text-center">ADD A NEW PERSONAL EVENT</h5>
            <Formik
              initialValues={{
                eventName: '',
                startTime: new Date(),
                endTime: null,
                repeatDaily: false,
                repeatWeekly: false,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                this.setState({
                  isLoading: true,
                });
                await this.props.addPersonalEvent(values);
                this.setState({
                  isLoading: false,
                });

                //refresh the page afterwards
                window.location.reload();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="uk-width-1-1 uk-margin">
                    <label className="uk-form-label" htmlFor="name">
                      Event Name
                    </label>
                    <input
                      id="eventName"
                      name="eventName"
                      className={`uk-input uk-form-large ${
                        touched.events && errors.eventName
                          ? 'uk-form-danger'
                          : null
                      }`}
                      type="text"
                      value={values.eventName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Event Name"
                      disabled={isLoading}
                    />
                    {touched.eventName && errors.eventName ? (
                      <p className="uk-text-danger">{errors.eventName}</p>
                    ) : null}
                    <label
                      className="uk-form-label uk-margin-small-right"
                      htmlFor="startTime"
                    >
                      Start Time:
                    </label>
                    <DateTimePicker
                      id="startTime"
                      name="startTime"
                      className={`uk-margin-top ${
                        touched.startTime && errors.startTime
                          ? 'uk-form-danger'
                          : null
                      }`}
                      onChange={(date) => {
                        setFieldValue('startTime', date);
                      }}
                      value={values.startTime}
                    />{' '}
                    <br />
                    <label
                      className="uk-form-label uk-margin-small-right uk-margin-top"
                      htmlFor="endTime"
                    >
                      End Time:
                    </label>
                    <DateTimePicker
                      id="endTime"
                      className={`uk-margin-top ${
                        touched.startTime && errors.startTime
                          ? 'uk-form-danger'
                          : null
                      }`}
                      name="endTime"
                      onChange={(date) => {
                        setFieldValue('endTime', date);
                      }}
                      value={values.endTime}
                    />{' '}
                    <br />
                    <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                      <label>
                        <input
                          id="repeatDaily"
                          name="repeat"
                          className="uk-radio"
                          type="radio"
                          defaultChecked={values.repeatDaily}
                          onChange={() => {
                            setFieldValue('repeatWeekly', false);
                            setFieldValue('repeatDaily', true);
                          }}
                        />{' '}
                        Repeat Daily
                      </label>
                      <label>
                        <input
                          id="repeatWeekly"
                          name="repeat"
                          className="uk-radio"
                          type="radio"
                          defaultChecked={values.repeatWeekly}
                          onChange={() => {
                            setFieldValue('repeatWeekly', true);
                            setFieldValue('repeatDaily', false);
                          }}
                        />{' '}
                        Repeat Weekly
                      </label>
                    </div>
                    <div className="uk-width-1-1 uk-text-center">
                      <button
                        className="uk-button uk-button__animate uk-button-primary uk-button-large uk-margin-top uk-margin-bottom"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating...' : 'Create Event'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        {/** modal to set user profile picture */}
        <div id="set-avatar" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <h2 className="uk-modal-title">SET YOUR PROFILE PICTURE</h2>
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

        {/** sweet alert component */}
        {currentEvent ? (
          <SweetAlert
            show={show}
            info
            title={currentEvent.eventName}
            onConfirm={() =>
              this.setState({
                show: false,
              })
            }
            onCancel={() =>
              this.setState({
                show: false,
              })
            }
            customButtons={
              <React.Fragment>
                <button
                  className="uk-button uk-button-primary uk-button-large uk-margin-medium-top uk-margin-medium-bottom uk-margin-small-right"
                  onClick={() =>
                    this.setState({
                      show: false,
                    })
                  }
                >
                  Close
                </button>
                <button
                  className="uk-button uk-button-danger uk-button-large uk-margin-medium-top uk-margin-medium-bottom"
                  onClick={() => this.deletePersonalEvent(currentEvent._id)}
                >
                  Delete
                </button>
              </React.Fragment>
            }
          >
            {`${currentEvent.eventName} starts at ${moment(
              currentEvent.startTime
            ).format('Do MMMM YYYY, h:mm a')} and ends at ${moment(
              currentEvent.endTime
            ).format('Do MMMM YYYY, h:mm a')}`}
          </SweetAlert>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  auth: { user },
  timetable: { personalTimetable, classTimetable },
}) => ({
  user,
  personalTimetable,
  classTimetable,
});

export default connect(mapStateToProps, {
  setStudentProfileImg,
  getStudentPersonalTimetable,
  getStudentClassTimetable,
  addPersonalEvent,
})(withRouter(Home));
