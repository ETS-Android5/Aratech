import React from 'react';
import { Link } from 'react-router-dom';

const Footer = props => (
  <footer className="uk-border-dark-top">
    <div className="uk-section uk-section-secondary">
      <div className="uk-container uk-h6 uk-margin-top">
        <div
          className="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-large"
          data-uk-grid
        >
          <div>
            <Link to="/" className="uk-logo">
              Lecture Monitor
            </Link>
          </div>
          <div>
            <ul className="uk-list uk-list-large">
              <li>
                <Link className="uk-link-border" to="/developers">
                  Developers
                </Link>
              </li>
              <li>
                <Link className="uk-link-border" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="uk-list uk-list-large">
              <li>
                <Link className="uk-link-border" to="/initiatives">
                  Our Initiatives
                </Link>
              </li>
              <li>
                <Link className="uk-link-border" to="/about">
                  Who we are
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="uk-list uk-list-large">
              <li>
                <Link className="uk-link-border" to="/terms">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link className="uk-link-border" to="/privacy">
                  Privacy policy
                </Link>
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
                <a
                  className="uk-link-border"
                  href="https://web.facebook.com/aratech.aratech.7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="uk-link-border"
                  href="https://twitter.com/aratech_knust?s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="uk-link-border"
                  href="https://instagram.com/_aratech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="uk-flex-first@m">
            <p>
              {' '}
              <a className="uk-link-border" href="#">
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
