import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Navbar from '../components/Navbar';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().required(),
});

const Contact = () => {
  const [isLoading, setLoading] = React.useState(false);

  return (
    <>
      <Navbar />
      <div className="uk-grid uk-text-center" data-uk-grid>
        <h3 className="uk-width-1-1">Meet The Developers</h3>
        <p className="uk-text-large uk-text-left uk-padding-large">
          Meet the People behind Aratech and Lecture Monitor, who made this
          project a huge success
        </p>
      </div>
      <div
        className="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center"
        data-uk-grid
      >
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/godoe.jpg')}
            alt="Godfred"
            style={{ width: 250, height: 250 }}
          />
          <p>Godfred Doe(PM)</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/francis.jpg')}
            alt="Francis"
            style={{ width: 250, height: 250 }}
          />
          <p>Gyimah Francis(Deputy PM)</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/austin2.jpg')}
            alt="Austin"
            style={{ width: 250, height: 250 }}
          />
          <p>Appiah Austin</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/austin2.jpg')}
            alt="Austin"
            style={{ width: 250, height: 250 }}
          />
          <p>Appiah Austin</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/clifford.jpg')}
            alt="Clifford"
            style={{ width: 250, height: 250 }}
          />
          <p>Owusu Amponsah Clifford</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/dakud.jpg')}
            alt="Akud"
            style={{ width: 250, height: 250 }}
          />
          <p>Akudbilla Daniel</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/tkay.jpg')}
            alt="Tkay"
            style={{ width: 250, height: 250 }}
          />
          <p>Tweneboah Koduah Emmanuel</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/kwame.jpg')}
            alt="Austin"
            style={{ width: 250, height: 250 }}
          />
          <p>Oppong Kwame</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/donald.jpg')}
            alt="Donald"
            style={{ width: 250, height: 250 }}
          />
          <p>Adjei Donald</p>
        </div>
        <div className="uk-thumbnail uk-border-cirle uk-overlay-hover">
          <img
            className="uk-border-circle"
            src={require('../assets/chenti.jpg')}
            alt="Chenti"
            style={{ width: 250, height: 250 }}
          />
          <p>Chenti Wuni</p>
        </div>
      </div>
      <hr className="uk-grid-divider" />
      <div className="uk-grid uk-margin uk-padding" data-uk-grid>
        <div className="uk-width-2-3@m">
          <div className="uk-panel uk-panel-header">
            <h3 className="uk-panel-title">Get In Touch</h3>
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setLoading(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="uk-width-1-1 uk-margin">
                    <label className="uk-form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className={`uk-input uk-form-large ${
                        touched.name && errors.name ? 'uk-form-danger' : null
                      }`}
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Aratech Aratech"
                      disabled={isLoading}
                    />
                    {touched.name && errors.name ? (
                      <p className="uk-text-danger">{errors.name}</p>
                    ) : null}
                  </div>

                  <div className="uk-width-1-1 uk-margin">
                    <label className="uk-form-label" htmlFor="password">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      className={`uk-input uk-form-large ${
                        touched.email && errors.email ? 'uk-form-danger' : null
                      }`}
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="aratech@gmail.com"
                      disabled={isLoading}
                    />
                    {touched.email && errors.email ? (
                      <p className="uk-text-danger">{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="uk-width-1-1 uk-margin">
                    <label className="uk-form-label" htmlFor="password">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={`uk-textarea uk-form-large ${
                        touched.message && errors.message
                          ? 'uk-form-danger'
                          : null
                      }`}
                      type="text"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your message..."
                      disabled={isLoading}
                    />
                    {touched.message && errors.message ? (
                      <p className="uk-text-danger">{errors.message}</p>
                    ) : null}
                  </div>
                  <div className="uk-width-1-1 uk-text-center">
                    <button
                      className="uk-button uk-button__animate uk-button-primary uk-button-large"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
