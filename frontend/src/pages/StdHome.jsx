import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UIKit from 'uikit';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ImageUploader from 'react-images-upload';

import Navbar from '../components/Navbar';
import { setStudentProfileImg } from '../store/actions/authActions';
import {
  getStudentPersonalTimetable,
  getStudentClassTimetable,
} from '../store/actions/timetableActions';
import isEmpty from '../validations/isEmpty';

//use moment as defaullt localizer for calendar
const localizer = momentLocalizer(moment);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      events: [],
      upcomingEvents: [],
      onGoingEvents: [],
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
      const events = this.props.personalTimetable;
      this.setState({
        events: events ? this.state.events.concat(events) : this.state.events,
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
    const isSet = await this.props.setStudentProfileImg(this.state.image);
    if (isSet) {
      UIKit.modal('#set-avatar').hide();
    } else {
      //todo: decide what to do later
    }
  };

  render() {
    const { events, upcomingEvents, onGoingEvents } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {/**calendar component */}
        <div className="uk-grid-collapse" data-uk-grid>
          <div className="uk-width-1-2@m uk-padding-small uk-flex uk-flex-middle uk-flex-center">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="startTime"
              endAccessor="endTime"
              views={['day', 'week', 'agenda']}
              defaultView={'day'}
            />
          </div>
          <div className="uk-width-1-2@m">
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
                  <li>{event}</li>
                ))}
              </ul>
              <h4>Ongoing events</h4>
              {isEmpty(onGoingEvents) ? <p>No Ongoing Events now...</p> : null}
              <ul>
                {upcomingEvents.map((event) => (
                  <li>{event}</li>
                ))}
              </ul>
            </div>
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
              disabled={!this.state.image}
              onClick={this.uploadImage}
            >
              Submit
            </button>
          </div>
        </div>
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
})(withRouter(Home));
