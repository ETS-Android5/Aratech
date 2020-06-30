import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';

const Landing = ({ isAuthenticated }) => {
  return (
    <React.Fragment>
      <header
        className="uk-cover-container uk-background-cover uk-background-norepeat uk-background-center-center"
        style={{
          backgroundImage: 'url(' + require('../assets/students.jpg') + ')',
        }}
      >
        <div className="uk-overlay uk-position-cover uk-overlay-video"></div>
        <Navbar />
        <div
          className="uk-container uk-container-large uk-light"
          data-uk-height-viewport="offset-top: true"
        >
          <div data-uk-grid data-uk-height-viewport="offset-top: true">
            <div className="uk-header-left uk-section uk-visible@m uk-flex uk-flex-bottom">
              <div className="uk-text-xsmall uk-text-bold">
                <a
                  className="hvr-back"
                  href="#about"
                  data-uk-scroll="offset: 80"
                >
                  <span
                    className="uk-margin-small-right"
                    data-uk-icon="arrow-left"
                  ></span>
                  Scroll down
                </a>
              </div>
            </div>
            <div className="uk-width-expand@m uk-section uk-flex uk-flex-column">
              <div className="uk-margin-auto-top uk-margin-auto-bottom">
                <h1
                  className="uk-heading-medium uk-margin-remove-top uk-letter-spacing-xl"
                  data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: true"
                >
                  <mark>The World's </mark>
                  Smartest <mark>Lecture Monitoring</mark> system{' '}
                </h1>
                <div
                  className="uk-grid-collapse uk-width-3-4@m uk-margin-medium-top"
                  data-uk-grid
                  data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true"
                ></div>
              </div>
              <div
                className="uk-margin-auto-top"
                data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 400; repeat: true"
              >
                <div
                  className="uk-child-width-1-2@s uk-grid-large uk-margin-medium-top"
                  data-uk-grid
                >
                  <div>
                    <h4 className="uk-margin-remove">
                      Take Charge With Your Phone
                    </h4>
                    <p className="uk-margin-xsmall-top uk-text-small uk-text-muted uk-text-bold">
                      Take control of your academic life with your phone today!
                    </p>
                  </div>
                  <div>
                    <h4 className="uk-margin-remove">
                      Important Notifications Only
                    </h4>
                    <p className="uk-margin-xsmall-top uk-text-small uk-text-muted uk-text-bold">
                      Curated notifications to make sure you don't miss anything
                      related to lectures, assignments, etc
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-header-right uk-section uk-visible@m uk-flex uk-flex-right uk-flex-bottom">
              <div>
                <ul className="uk-subnav uk-text-xsmall uk-text-bold">
                  <li>
                    <a
                      className="uk-link-border"
                      href="https://web.facebook.com/aratech.aratech.7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className="uk-link-border"
                      href="https://twitter.com/aratech_knust?s=08"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      twitter
                    </a>
                  </li>
                  <li>
                    <a
                      className="uk-link-border"
                      href="https://instagram.com/_aratech"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="about" className="uk-section uk-section-muted uk-section-large">
        <div className="uk-container">
          <div
            className="uk-child-width-1-2@s uk-child-width-1-3@m uk-margin-large-top uk-grid-match"
            data-uk-grid
          >
            {/* <!-- @include cards-courses-1.kit --> */}
          </div>
          {!isAuthenticated && (
            <Link
              to=""
              className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
              data-uk-toggle="target: #signin-modal"
            >
              Login Now
            </Link>
          )}
        </div>
      </div>
      <div className="uk-section uk-section-muted uk-section-large">
        <div className="uk-container uk-container-expand">
          <div className="uk-child-width-1-2@s uk-grid-large" data-uk-grid>
            <div>
              <div
                className="uk-child-width-1-3 uk-grid-small"
                data-uk-grid="parallax: 150"
              >
                <div>
                  <img src={require('../assets/kwame.jpg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img src={require('../assets/tkay.jpg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img src={require('../assets/chenti.jpg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img src={require('../assets/dakud.jpg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img
                    src={require('../assets/clifford.jpg')}
                    alt="Tow Sawyer"
                  />
                </div>
                <div>
                  <img src={require('../assets/godoe.jpg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img
                    src={require('../assets/francis.jpg')}
                    alt="Tow Sawyer"
                  />
                </div>
                <div>
                  <img src={require('../assets/john.jpeg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img src={require('../assets/donald.jpg')} alt="Tow Sawyer" />
                </div>
                <div>
                  <img
                    src={require('../assets/austin2.jpg')}
                    alt="Tow Sawyer"
                  />
                </div>
              </div>
            </div>
            <div className="uk-flex uk-flex-middle">
              <div className="uk-width-3-4@m">
                <h2 className="uk-heading-small">
                  Our <mark>community</mark> is here every step of the way
                </h2>
                <ul className="uk-list uk-list-large uk-list-bullet uk-text-large uk-margin-medium-top">
                  <li>24/7 response system</li>
                  <li>
                    Well dedicated team to guide you every step of the way
                  </li>
                  <li>
                    FAQs to help you answers to most frequently asked questions
                  </li>
                  <li>
                    A support page where you can channel all your questions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="uk-section uk-section-muted uk-section-large uk-padding-remove-bottom">
        <div className="uk-container uk-container-small uk-text-center">
          <h2 className="uk-heading-small">
            <mark>Plan</mark> for the <mark>EXAM</mark>
          </h2>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="uk-button uk-button-primary uk-button-large uk-margin-medium-top uk-margin-medium-bottom"
              data-uk-toggle="target: #signup-modal"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
