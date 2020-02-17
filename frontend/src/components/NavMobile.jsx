import React from "react";
import { Link } from "react-router-dom";

const NavMobile = props => (
  <div
    id="offcanvas"
    data-uk-offcanvas="flip: true; overlay: true"
    className="uk-width-1-2"
  >
    <div className="uk-offcanvas-bar uk-width-1-1">
      <Link className="uk-logo uk-margin-medium-right" to="/">
        Lecture Monitor
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
          <Link to="/dummy">Dummy</Link>
        </li>
        <li>
          <Link to="/dummy">Dummy</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
      <div className="uk-margin-medium-top">
        <Link
          className="uk-button uk-width-1-1 uk-button-default uk-padding-medium"
          to="/signup"
        >
          Sign Up
        </Link>
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
              rel="noopener noreferrer"
            ></a>
          </div>
          <div>
            <a
              href="https://www.facebook.com/"
              data-uk-icon="icon: facebook"
              className="uk-icon-link"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/"
              data-uk-icon="icon: instagram"
              className="uk-icon-link"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
          <div>
            <a
              href="https://vimeo.com/"
              data-uk-icon="icon: vimeo"
              className="uk-icon-link"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NavMobile;
