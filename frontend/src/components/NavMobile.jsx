import React from 'react';

const NavMobile = props => (
  <div id="offcanvas" data-uk-offcanvas="flip: true; overlay: true">
    <div className="uk-offcanvas-bar">
      <a className="uk-logo" href="index.html">
        Lecture Monitor
      </a>
      <button
        className="uk-offcanvas-close"
        type="button"
        data-uk-close="ratio: 1.2"
      ></button>
      <ul className="uk-nav uk-nav-primary uk-nav-offcanvas uk-margin-medium-top uk-text-center">
        <li>
          <a href="index.html">Home</a>
        </li>
        <li>
          <a href="courses.html">Courses</a>
        </li>
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
      <div className="uk-margin-medium-top">
        <a
          className="uk-button uk-width-1-1 uk-button-default"
          href="sign-up.html"
        >
          Sign Up
        </a>
      </div>
      <div className="uk-margin-medium-top uk-text-center">
        <div
          data-uk-grid
          className="uk-child-width-auto uk-grid-small uk-flex-center"
        >
          <div>
            <a
              href="https://twitter.com/"
              data-uk-icon="icon: twitter"
              className="uk-icon-link"
              target="_blank"
            ></a>
          </div>
          <div>
            <a
              href="https://www.facebook.com/"
              data-uk-icon="icon: facebook"
              className="uk-icon-link"
              target="_blank"
            ></a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/"
              data-uk-icon="icon: instagram"
              className="uk-icon-link"
              target="_blank"
            ></a>
          </div>
          <div>
            <a
              href="https://vimeo.com/"
              data-uk-icon="icon: vimeo"
              className="uk-icon-link"
              target="_blank"
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NavMobile;
