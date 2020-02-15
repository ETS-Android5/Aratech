import React from 'react';

const Footer = props => (
  <footer className="uk-border-dark-top">
    <div className="uk-section uk-section-secondary">
      <div className="uk-container uk-h6 uk-margin-top">
        <div
          className="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-large"
          data-uk-grid
        >
          <div>
            <a href="#" className="uk-logo">
              Lecture Monitor
            </a>
          </div>
          <div>
            <ul className="uk-list uk-list-large">
              <li>
                <a className="uk-link-border" href="#">
                  Developers
                </a>
              </li>
              <li>
                <a className="uk-link-border" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="uk-list uk-list-large">
              <li>
                <a className="uk-link-border" href="#">
                  Our Initiatives
                </a>
              </li>
              <li>
                <a className="uk-link-border" href="#">
                  Dammy Text
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="uk-list uk-list-large">
              <li>
                <a className="uk-link-border" href="#">
                  Terms of use
                </a>
              </li>
              <li>
                <a className="uk-link-border" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="uk-section uk-section-secondary">
      <div className="uk-container uk-h6">
        <div className="uk-child-width-1-2@m uk-grid-large" data-uk-grid>
          <div className="uk-flex uk-flex-right@m">
            <ul className="uk-subnav">
              <li>
                {/* Links to Aratech's social media*/}
                <a className="uk-link-border" href="#" target="_blank">
                  Facebook
                </a>
              </li>
              <li>
                <a className="uk-link-border" href="#" target="_blank">
                  Twitter
                </a>
              </li>
              <li>
                <a className="uk-link-border" href="#" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="uk-flex-first@m">
            <p>
              {' '}
              <a
                className="uk-link-border"
                href="https://drifter.works/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aratech
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
