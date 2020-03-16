import React from 'react';
import { Link } from 'react-router-dom';

const NavMobile = props => (
  <React.Fragment>
    <div
      id="offcanvas"
      data-uk-offcanvas="flip: true; overlay: true"
      className="uk-width-1-2"
    >
      <div className="uk-offcanvas-bar uk-width-1-1">
        <Link className="uk-logo uk-margin-medium-right" to="/">
          LM
        </Link>
        <button
          className="uk-offcanvas-close"
          type="button"
          data-uk-close="ratio: 1.2 "
        ></button>
        <ul className="uk-nav uk-nav-primary uk-nav-offcanvas uk-margin-medium-top uk-text-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/lecturer/signin">Lecture Sign In</Link>
          </li>
          <li>
            <Link to="/student/signin">Student Sign In</Link>
          </li>
        </ul>
        <div className="uk-margin-medium-top">
          <button
            className="uk-button uk-width-1-1 uk-button-default uk-padding-medium"
            data-uk-toggle="target: #signup-modal"
          >
            Sign Up
          </button>
        </div>
        <div className="uk-margin-medium-top uk-text-center">
          <div
            data-uk-grid
            className="uk-child-width-auto uk-grid-small uk-flex-center"
          >
            <div>
              <a
                href="https://twitter.com/aratech_knust?s=08"
                data-uk-icon="icon: twitter"
                className="uk-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
            <div>
              <a
                href="https://web.facebook.com/aratech.aratech.7"
                data-uk-icon="icon: facebook"
                className="uk-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/_aratech"
                data-uk-icon="icon: instagram"
                className="uk-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="signup-modal" data-uk-modal>
      <div className="uk-modal-dialog uk-modal-body">
        <button
          className="uk-modal-close-outside"
          type="button"
          data-uk-close
        ></button>
        <h2 className="uk-modal-title">Continue as Lecturer or Student</h2>
        <Link
          to="/lecturer/signup"
          className="uk-button uk-button-primary uk-button-large uk-margin-medium-top"
        >
          Continue as Lecturer
        </Link>
        <Link
          to="/student/signup"
          className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
        >
          Continue as Student
        </Link>
      </div>
    </div>
    <div id="signin-modal" data-uk-modal>
      <div className="uk-modal-dialog uk-modal-body">
        <button
          className="uk-modal-close-outside"
          type="button"
          data-uk-close
        ></button>
        <h2 className="uk-modal-title">Continue as Lecturer or Student</h2>
        <Link
          to="/lecturer/signin"
          className="uk-button uk-button-primary uk-button-large uk-margin-medium-top"
        >
          Continue as Lecturer
        </Link>
        <Link
          to="/student/signin"
          className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
        >
          Continue as Student
        </Link>
      </div>
    </div>
  </React.Fragment>
);

export default NavMobile;
