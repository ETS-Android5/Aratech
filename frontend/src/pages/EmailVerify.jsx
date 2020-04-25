import React from 'react';
import { withRouter } from 'react-router-dom';
import API from '../network/api';
import cogoToast from 'cogo-toast';

import Navbar from '../components/Navbar';

class EmailVerify extends React.Component {
  async componentDidMount() {
    const token = this.props.match.params.token;

    //verify user token
    try {
      const response = await API.post(`/auth/verifyemail?token=${token}`);
      cogoToast.success(response.data.message);
      this.props.history.push('/');
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
      cogoToast.error(message);
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div>
          <h1 className="uk-text-center">Verify Email</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(EmailVerify);
