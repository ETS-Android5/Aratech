import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './store/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './network/setAuthToken';
import {
  setCurrentStudent,
  setCurrentLecturer,
  logoutUser
} from './store/actions/authActions';

import NavMobile from './components/NavMobile';
import Landing from './pages/Landing';
import StdSignUp from './pages/StdSignup';
import StdSignIn from './pages/StdSignIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Footer from './components/Footer';
import LecturerSignIn from './pages/LecturerSignIn';
import LecturerSignUp from './pages/LecturerSignUp';

import './App.css';

const lecturerToken = localStorage.getItem('lm-lecturer-token');
const studentToken = localStorage.getItem('lm-student-token');

//check if lecturer token is valid
if (lecturerToken) {
  //set auth header for lecturer
  setAuthToken(lecturerToken);

  //decode token
  const decoded = jwt_decode(lecturerToken);
  //set lecturer to redux store
  store.dispatch(setCurrentLecturer(decoded));

  //check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = '/login';
  }
} else if (studentToken) {
  //check if student token is valid
  //set auth header for student
  setAuthToken(studentToken);

  //decode token
  const decoded = jwt_decode(studentToken);
  //set lecturer to redux store
  store.dispatch(setCurrentStudent(decoded));

  //check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = '/login';
  }
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={Landing} />
            <Route exact path="/student/signup" component={StdSignUp} />
            <Route exact path="/student/signin" component={StdSignIn} />
            <Route exact path="/lecturer/signup" component={LecturerSignUp} />
            <Route exact path="/lecturer/signin" component={LecturerSignIn} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/resetpassword" component={ResetPassword} />
          </Switch>
          {/* Include the mobile nav and footer in every page */}
          <NavMobile />
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
