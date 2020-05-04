import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => (
  <div className="uk-section-default uk-position-relative uk-light">
    <div
      className="uk-background-norepeat uk-background-cover uk-background-primary uk-background-center-center uk-section uk-flex uk-flex-middle"
      uk-height-viewport="offset-top: true"
    >
      <div className="uk-width-1-1">
        <div className="uk-container uk-position-relative">
          <div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid="">
            <div className="uk-width-1-1@m uk-first-column">
              <h1 className="uk-text-left@m uk-text-center uk-heading-hero uk-scrollspy-inview uk-animation-slide-left-medium">
                404
              </h1>
              <h6 className="uk-text-left@m uk-text-center uk-heading-primary uk-scrollspy-inview uk-animation-slide-left-medium">
                PAGE
                <br className="uk-visible@s" />
                NOT FOUND!
              </h6>
              <div className="uk-text-left@m uk-text-primary uk-text-center uk-text-lead uk-scrollspy-inview uk-animation-slide-left-medium">
                The requested page was not found, or an error occurred!
                <br className="uk-visible@s" />
                You can go back, or go home.
              </div>
              <div className="uk-text-left@m uk-text-center uk-scrollspy-inview uk-animation-slide-left-medium">
                <div
                  className="uk-flex-middle uk-child-width-auto uk-grid-medium uk-flex-left@m uk-flex-center uk-grid"
                  uk-grid=""
                >
                  <div className="el-item uk-first-column">
                    <Link className="uk-button uk-button-secondary" to="/">
                      <span uk-icon="forward" className="uk-icon"></span>
                      <span className="uk-text-middle">Home</span>
                    </Link>
                  </div>
                  <div className="el-item">
                    <a
                      className="uk-button uk-button-secondary"
                      href="javascript:history.go(-1)"
                    >
                      <span uk-icon="reply" className="uk-icon"></span>
                      <span className="uk-text-middle">Back</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
