import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header className="uk-cover-container uk-background-cover uk-background-norepeat uk-background-center-center">
          <video src="" data-uk-cover></video>
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
                  >
                    <div className="uk-width-expand">
                      <input
                        className="uk-input uk-form-large uk-border-remove-right"
                        type="text"
                        placeholder="Find your program"
                      />
                    </div>
                    <div className="uk-width-auto">
                      <button className="uk-button uk-button-large uk-button-success-outline">
                        Search programs
                      </button>
                    </div>
                  </div>
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
                        Choose from over 15000 courses
                      </h4>
                      <p className="uk-margin-xsmall-top uk-text-small uk-text-muted uk-text-bold">
                        Distinctively recaptiualize scalable potentialities
                        through scalable web services.
                      </p>
                    </div>
                    <div>
                      <h4 className="uk-margin-remove">
                        Study online at your own pace
                      </h4>
                      <p className="uk-margin-xsmall-top uk-text-small uk-text-muted uk-text-bold">
                        Assertively actualize goal-oriented models whereas
                        world-className e-services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-header-right uk-section uk-visible@m uk-flex uk-flex-right uk-flex-bottom">
                <div>
                  <ul className="uk-subnav uk-text-xsmall uk-text-bold">
                    <li>
                      <a className="uk-link-border" href="#" target="_blank">
                        facebook
                      </a>
                    </li>
                    <li>
                      <a className="uk-link-border" href="#" target="_blank">
                        twitter
                      </a>
                    </li>
                    <li>
                      <a className="uk-link-border" href="#" target="_blank">
                        instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          id="about"
          className="uk-section uk-section-muted uk-section-large"
        >
          <div className="uk-container">
            <div className="uk-width-4-5@m">
              <h2 className="uk-heading-small">
                <mark>Unlimited</mark> access to thousands of{' '}
                <mark>courses</mark>
              </h2>
            </div>
            <div
              className="uk-child-width-1-2@s uk-child-width-1-3@m uk-margin-large-top uk-grid-match"
              data-uk-grid
            >
              {/* <!-- @include cards-courses-1.kit --> */}
            </div>
            <a
              href="courses.html"
              className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
            >
              Explore courses
            </a>
          </div>
        </div>

        <div className="uk-section uk-section-large">
          <div className="uk-container">
            <h2 className="uk-heading-small">
              <mark>Instructors</mark> are professionals width years of
              experience
            </h2>
            <div
              className="uk-child-width-1-2@m uk-margin-large-top uk-grid-large"
              data-uk-grid
            >
              <div>
                <div className="uk-child-width-1-2" data-uk-grid>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div className="uk-flex uk-flex-middle">
                    <div>
                      <h3 className="uk-text-primary">Alex Tomson</h3>
                      <p className="uk-text-small uk-margin-xsmall">
                        Energistically leverage other's wireless action items
                        before market positioning applications appropriately
                        productize best-of-breed.
                      </p>
                      <div
                        data-uk-grid
                        className="uk-child-width-auto uk-grid-small uk-margin-top"
                      >
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: facebook; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: instagram; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: dribbble; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: youtube; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="uk-child-width-1-2" data-uk-grid>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div className="uk-flex uk-flex-middle">
                    <div>
                      <h3 className="uk-text-primary">Tow Sawyer</h3>
                      <p className="uk-text-small uk-margin-xsmall">
                        Appropriately productize best-of-breed platforms for
                        distributed testing procedures distinctively
                        conceptualize ethical.
                      </p>
                      <div
                        data-uk-grid
                        className="uk-child-width-auto uk-grid-small uk-margin-top"
                      >
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: twitter; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: instagram; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: dribbble; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                        <div>
                          <a
                            href="#"
                            data-uk-icon="icon: vimeo; ratio: .9"
                            className="uk-icon-link uk-icon"
                            target="_blank"
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
                      alt="Tow Sawyer"
                    />
                  </div>
                  <div>
                    <img
                      src="https://via.placeholder.com/400x400"
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
                    <li>
                      Formulate alternative and professional ideas business
                    </li>
                    <li>
                      Readiness and professional e-tailers. Conveniently evolve
                      installed base ideas
                    </li>
                    <li>
                      Evolve installed base ideas vis-a-vis business processes
                    </li>
                    <li>
                      Monotonectally incubate quality manufactured products
                      without high-quality
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
              <mark>Join</mark> the thousands and learn something new{' '}
              <mark>today</mark>
            </h2>
            <a
              href="sign-up.html"
              className="uk-button uk-button-primary uk-button-large uk-margin-medium-top"
            >
              Signup for free
            </a>
          </div>
          <div
            className="uk-child-width-1-5 uk-child-width-expand@m uk-margin-xlarge-top uk-grid-collapse"
            data-uk-grid
          >
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
            <div>
              <img src="https://via.placeholder.com/400x400" alt="Tow Sawyer" />
            </div>
          </div>
        </div>

        <div
          className="uk-section uk-section-large uk-background-cover uk-background-norepeat 
  uk-background-center-center uk-background-blend-soft-light uk-light uk-background-primary"
          style={{
            backgroundImage: 'url(https://placeholder.com)'
          }}
        >
          <div className="uk-container uk-container-large">
            <div className="uk-width-1-2@m">
              <h2 className="uk-heading-small uk-margin-remove">
                What do you want to <mark>learn today</mark>
              </h2>
            </div>
          </div>
          <div className="uk-container uk-container-large uk-margin-large-top">
            <div className="uk-grid-large" data-uk-grid>
              <div className="uk-width-1-3@m">
                <p className="uk-text-large">
                  Professionally build sticky ideas visavis front-end
                  convergence. Intrinsicly enable multifunctional total linkage
                  and also revolutionary paradigms.
                </p>
                <a
                  href="courses.html"
                  className="uk-button uk-button-success-outline uk-button-large uk-margin-medium-top"
                >
                  Find your course
                </a>
              </div>
              <div className="uk-width-expand@m">
                <div data-uk-slider="sets: true">
                  <div
                    className="uk-position-relative uk-visible-toggle uk-light"
                    tabindex="-1"
                  >
                    <div className="uk-slider-container">
                      <div className="uk-position-absolute uk-slidenav-above">
                        <a
                          className="uk-slidenav-large uk-visible@m uk-text-success uk-margin-right"
                          href="#"
                          data-uk-slidenav-previous
                          data-uk-slider-item="previous"
                        ></a>
                        <a
                          className="uk-slidenav-large uk-visible@m uk-text-success"
                          href="#"
                          data-uk-slidenav-next
                          data-uk-slider-item="next"
                        ></a>
                      </div>
                      <ul className="uk-slider-items uk-child-width-1-3@s uk-grid-large">
                        <li>
                          <div className="uk-card uk-border-light-hover uk-card-small uk-height-small uk-inline uk-border-light-xlarge uk-flex uk-flex-column">
                            <div className="uk-card-body uk-margin-auto-top">
                              <h3 className="uk-card-title uk-margin-remove">
                                Business
                              </h3>
                              <p className="uk-text-small uk-text-demi-bold uk-margin-xsmall-top">
                                185 courses
                              </p>
                            </div>
                            <a
                              href="courses.html"
                              className="uk-position-cover"
                            ></a>
                          </div>
                        </li>
                        <li>
                          <div className="uk-card uk-border-light-hover uk-card-small uk-height-small uk-inline uk-border-light-xlarge uk-flex uk-flex-column">
                            <div className="uk-card-body uk-margin-auto-top">
                              <h3 className="uk-card-title uk-margin-remove">
                                Development
                              </h3>
                              <p className="uk-text-small uk-text-demi-bold uk-margin-xsmall-top">
                                79 courses
                              </p>
                            </div>
                            <a
                              href="courses.html"
                              className="uk-position-cover"
                            ></a>
                          </div>
                        </li>
                        <li>
                          <div className="uk-card uk-border-light-hover uk-card-small uk-height-small uk-inline uk-border-light-xlarge uk-flex uk-flex-column">
                            <div className="uk-card-body uk-margin-auto-top">
                              <h3 className="uk-card-title uk-margin-remove">
                                Design
                              </h3>
                              <p className="uk-text-small uk-text-demi-bold uk-margin-xsmall-top">
                                256 courses
                              </p>
                            </div>
                            <a
                              href="courses.html"
                              className="uk-position-cover"
                            ></a>
                          </div>
                        </li>
                        <li>
                          <div className="uk-card uk-border-light-hover uk-card-small uk-height-small uk-inline uk-border-light-xlarge uk-flex uk-flex-column">
                            <div className="uk-card-body uk-margin-auto-top">
                              <h3 className="uk-card-title uk-margin-remove">
                                Finance
                              </h3>
                              <p className="uk-text-small uk-text-demi-bold uk-margin-xsmall-top">
                                214 courses
                              </p>
                            </div>
                            <a
                              href="courses.html"
                              className="uk-position-cover"
                            ></a>
                          </div>
                        </li>
                        <li>
                          <div className="uk-card uk-border-light-hover uk-card-small uk-height-small uk-inline uk-border-light-xlarge uk-flex uk-flex-column">
                            <div className="uk-card-body uk-margin-auto-top">
                              <h3 className="uk-card-title uk-margin-remove">
                                Marketing
                              </h3>
                              <p className="uk-text-small uk-text-demi-bold uk-margin-xsmall-top">
                                79 courses
                              </p>
                            </div>
                            <a
                              href="courses.html"
                              className="uk-position-cover"
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <a
                      className="uk-position-center-left uk-position-small uk-hidden@m"
                      href="#"
                      data-uk-slidenav-previous
                      data-uk-slider-item="previous"
                    ></a>
                    <a
                      className="uk-position-center-right uk-position-small uk-hidden@m"
                      href="#"
                      data-uk-slidenav-next
                      data-uk-slider-item="next"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Landing;
