import React from 'react';

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
              <a className="uk-navbar-item uk-logo" href="index.html">
                Lecture Monitor
              </a>
            </div>
            <div className="uk-navbar-center">
              <ul className="uk-navbar-nav uk-visible@m">
                <li className="uk-active">
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="courses.html">Courses</a>
                </li>
                <li>
                  <a href="search.html">Search</a>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <a href="course.html">Single Course</a>
                      </li>
                      <li>
                        <a href="search.html">Search</a>
                      </li>
                      <li>
                        <a href="sign-in.html">Sign In</a>
                      </li>
                      <li>
                        <a href="sign-up.html">Sign Up</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <div>
                <a
                  className="uk-navbar-toggle"
                  data-uk-search-icon
                  href="#"
                ></a>
                <div
                  className="uk-drop"
                  data-uk-drop="mode: click; pos: left-center; offset: 0"
                >
                  <form className="uk-search uk-search-navbar uk-width-1-1">
                    <input
                      className="uk-search-input uk-text-demi-bold"
                      type="search"
                      placeholder="Search..."
                      autoFocus
                    />
                  </form>
                </div>
              </div>
              <div className="uk-navbar-item">
                <div>
                  <a
                    className="uk-button uk-button-success-outline"
                    href="sign-up.html"
                  >
                    Sign Up
                  </a>
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
  </React.Fragment>
);

export default Navbar;
