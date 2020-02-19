import React from "react";
import { Link } from "react-router-dom";

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
                <li style={{ color: "white" }}>
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
                  <Link
                    className="uk-button uk-button-success-outline"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <Link
                className="uk-navbar-toggle uk-hidden@m"
                data-uk-toggle="target: #offcanvas"
              >
                <span data-uk-navbar-toggle-icon></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </React.Fragment>
);

export default Navbar;
