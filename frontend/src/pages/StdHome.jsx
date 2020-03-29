import React from "react";
import { connect } from "react-redux";
import UIKit from "uikit";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ImageUploader from "react-images-upload";

import Navbar from "../components/Navbar";

//use moment as defaullt localizer for calendar
const localizer = momentLocalizer(moment);

import { setStudentProfileImg } from "../store/actions/authActions";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
  }

  componentDidMount() {
    //verify if user has a profile image, if not set one
    if (!this.props.user.avatar) {
      UIKit.modal("#set-avatar", {
        bgClose: false,
        escClose: false,
        modal: false,
        keyboard: false
      }).show();
    }
  }

  onFileChange = pictureFiles => {
    this.setState({
      image: pictureFiles[0]
    });
  };

  uploadImage = async () => {
    const isSet = await this.props.setStudentProfileImg(this.state.image);
    if (isSet) {
      UIKit.modal("#set-avatar").hide();
    } else {
      //todo: decide what to do later
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        {/**calendar component */}
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="startTime"
          endAccessor="endTime"
          views={["day", "week", "agenda"]}
          defaultView={"day"}
          style={{ height: 50 }}
        />

        {/** modal to set user profile picture */}
        <div id="set-avatar" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <h2 className="uk-modal-title">SET YOUR PROFILE PICTURE</h2>
            <p>Only first image will be uploaded</p>
            <ImageUploader
              withIcon={true}
              buttonText="Choose image"
              onChange={this.onFileChange}
              imgExtension={[".jpg", ".png"]}
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

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

export default connect(mapStateToProps, { setStudentProfileImg })(Home);
