import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    //verify if user has a profile image, if not set one
    if (!this.props.user.avatar) {
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="set-avatar" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
            <h2 className="uk-modal-title">SET YOUR PROFILE PICTURE</h2>
            <button className="uk-modal-close" type="button"></button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

export default connect(mapStateToProps)(Home);
