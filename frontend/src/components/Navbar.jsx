import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authActions";

const Navbar = ({
  isAuthenticated,
  isLecturer,
  isStudent,
  user,
  logoutUser,
}) => (
  <React.Fragment>
    <div
      data-uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container  
	  cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-dark; top: 100"
    >
      <nav className="uk-navbar-container uk-letter-spacing-small uk-text-bold">
        <div className="uk-container uk-container-large">
          <div className="uk-position-z-index" data-uk-navbar>
            <div className="uk-navbar-left">
              <Link
                className="uk-navbar-item uk-logo"
                to="/"
                style={{ fontSize: "2em" }}
              >
                LM
              </Link>
            </div>
            <div className="uk-navbar-center">
              <ul className="uk-navbar-nav uk-visible@m">
                <li>
                  <NavLink
                    to="/"
                    activeClassName="uk-active"
                    style={{ fontSize: "1.3em" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <Link to="/contact" style={{ fontSize: "1.3em" }}>
                    contact
                  </Link>
                </li>
                {!isAuthenticated ? (
                  <li>
                    <Link to="" style={{ fontSize: "1.3em" }}>
                      Account
                    </Link>
                    <div className="uk-navbar-dropdown">
                      <ul className="uk-nav uk-navbar-dropdown-nav">
                        <li>
                          <NavLink
                            activeClassName="uk-active"
                            to="/lecturer/signin"
                          >
                            Lecturer - Sign In
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            activeClassName="uk-active"
                            to="/lecturer/signup"
                          >
                            Lecturer - Sign Up
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            activeClassName="uk-active"
                            to="/student/signin"
                          >
                            Student - Sign In
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            activeClassName="uk-active"
                            to="/student/signup"
                          >
                            Student - Sign Up
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : isStudent ? (
                  <li>
                    <Link
                      to="/student/home"
                      className="uk-navbar-item"
                      style={{ fontSize: "1.2em" }}
                    >
                      Student' Home
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/lecturer/home"
                      className="uk-navbar-item"
                      style={{ fontSize: "1.2em" }}
                    >
                      Lecturer's Home
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="uk-navbar-right">
              {!isAuthenticated ? (
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
              ) : (
                <div className="uk-navbar-item">
                  <div>
                    <button
                      className="uk-button uk-button-success-outline"
                      type="button"
                      onClick={logoutUser}
                    >
                      Log out
                    </button>
                  </div>
                  <Link
                    to={isLecturer ? "/lecturer/profile" : "/student/profile"}
                    className="uk-navbar-item"
                  >
                    <img
                      className="uk-border-circle"
                      src={user.avatar}
                      style={{ width: 40, height: 40 }}
                      alt="Border rounded"
                    />
                  </Link>
                </div>
              )}
              <Link
                to=""
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

const mapStateToProps = ({
  auth: { isAuthenticated, isStudent, isLecturer, user },
}) => ({
  isAuthenticated,
  isStudent,
  isLecturer,
  user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
