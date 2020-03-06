import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => (
  <React.Fragment>
    <div
      data-uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container  
	  cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-dark; top: 500"
    >
      <nav className="uk-navbar-container uk-letter-spacing-small uk-text-bold">
        <div className="uk-container uk-container-large">
          <div className="uk-position-z-index" data-uk-navbar>
            <div className="uk-navbar-left">
              <Link className="uk-navbar-item uk-logo" to="/">
                LM
              </Link>
            </div>
            <div className="uk-navbar-center">
              <ul className="uk-navbar-nav uk-visible@m">
                <li className="uk-active">
                  <Link to="/">Home</Link>
                </li>
                <li style={{ color: 'white' }}>
                  <Link to="/contact">contact</Link>
                </li>
                <li>
                  <Link to="#">Account</Link>
                  <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <Link to="/lecturer/signin">Lecturer - Sign In</Link>
                      </li>
                      <li>
                        <Link to="/lecturer/signup">Lecturer - Sign Up</Link>
                      </li>
                      <li>
                        <Link to="/student/signin">Student - Sign In</Link>
                      </li>
                      <li>
                        <Link to="/student/signup">Student - Sign Up</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <div className="uk-navbar-item">
                <div>
                  <button
                    className="uk-button uk-button-success-outline"
                    type="button"
                    data-uk-toggle="target: #signup-modal"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <a
                className="uk-navbar-toggle uk-hidden@m"
                data-uk-toggle="target: #offcanvas"
              >
                <span data-uk-navbar-toggle-icon></span>
              </a>
            </div>
          </div>
        </div>
      </nav>
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
          data-uk-toggle="target: #signup-modal"
        >
          Continue as Lecturer
        </Link>
        <Link
          to="/student/signup"
          className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
          data-uk-toggle="target: #signup-modal"
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
          data-uk-toggle="target: #signin-modal"
        >
          Continue as Lecturer
        </Link>
        <Link
          to="/student/signin"
          className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
          data-uk-toggle="target: #signin-modal"
        >
          Continue as Student
        </Link>
      </div>
    </div>
  </React.Fragment>
);

export default Navbar;
