import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './store/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './network/setAuthToken';
import {
  setCurrentStudent,
  setCurrentLecturer,
  logoutUser,
} from './store/actions/authActions';

import PrivateRoute from './components/PrivateRoute';
import NavMobile from './components/NavMobile';
import Landing from './pages/Landing';
import StdSignUp from './pages/StdSignup';
import StdSignIn from './pages/StdSignIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Footer from './components/Footer';
import LecturerSignIn from './pages/LecturerSignIn';
import LecturerSignUp from './pages/LecturerSignUp';
import EmailVerify from './pages/EmailVerify';
import NotFound from './pages/NotFound';
import StdProfile from './pages/StdProfile';
import StdHome from './pages/StdHome';
import LctHome from './pages/LctHome';
import EditStdProfile from './pages/EditStdProfile';
import Contact from './pages/Contact';
import LctProfile from './pages/LctProfile';
import EditLctProfile from './pages/EditLctProfile';
import StdAss from './pages/StdAssignment';

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
    window.location.href = '/lecturer/signin';
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
    window.location.href = '/student/signin';
  }
}

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={Landing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/student/signup" component={StdSignUp} />
          <Route exact path="/student/signin" component={StdSignIn} />
          <Route exact path="/lecturer/signup" component={LecturerSignUp} />
          <Route exact path="/lecturer/signin" component={LecturerSignIn} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/passwordreset/:token" component={ResetPassword} />
          <Route exact path="/confirmemail/:token" component={EmailVerify} />

          {/* private student routes */}
          <PrivateRoute exact path="/student/home" component={StdHome} />
          <PrivateRoute exact path="/student/profile" component={StdProfile} />
          <PrivateRoute
            exact
            path="/student/profile/edit"
            component={EditStdProfile}
          />
          <PrivateRoute exact path="/student/assignments" component={StdAss} />

          {/*private lecturer routes */}
          <PrivateRoute exact path="/lecturer/home" component={LctHome} />
          <PrivateRoute exact path="/lecturer/profile" component={LctProfile} />
          <PrivateRoute
            exact
            path="/lecturer/profile/edit"
            component={EditLctProfile}
          />

          {/* 404 Not founds */}
          <Route path="*" component={NotFound} />
        </Switch>
        {/* Include the mobile nav and footer in every page */}
        <NavMobile />
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
