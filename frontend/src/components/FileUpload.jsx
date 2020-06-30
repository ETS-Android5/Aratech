import React from 'react';

import { Formik } from 'formik';
import DateTimePicker from 'react-datetime-picker';
import * as yup from 'yup';

const FileUpload = ({ upload }) => {
  const [uploading, setUploading] = React.useState(false);
  return (
    <div className="uk-container">
      <Formik
        initialValues={{ file: null, deadline: '' }}
        onSubmit={async (values) => {
          setUploading(true);
          await upload(values);
          setUploading(false);

          // clear inputs
          values.file = null;
          values.deadline = '';
        }}
        validationSchema={yup.object().shape({
          file: yup.mixed().required(),
          deadline: yup.date().required(),
        })}
        render={({ values, handleSubmit, setFieldValue, errors, touched }) => {
          return (
            <form onSubmit={handleSubmit} className="uk-form">
              <div>
                <label
                  style={{ margin: '1em' }}
                  htmlFor="file"
                  className="uk-text-large uk-margin-medium uk-form-label"
                >
                  Upload Assignment
                </label>
                <input
                  style={{ width: '30em', marginBottom: '0.2em' }}
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  className="uk-input uk-form-width-medium"
                />
                <div>{values.file && values.file.name}</div>
              </div>
              <label
                className="uk-form-label uk-margin-small-right uk-margin-top"
                htmlFor="endTime"
              >
                Deadline
              </label>
              <DateTimePicker
                id="deadline"
                className={`uk-margin-top ${
                  touched.deadline && errors.deadline ? 'uk-form-danger' : null
                }`}
                name="deadline"
                onChange={(date) => {
                  setFieldValue('deadline', date);
                }}
                value={values.deadline}
              />{' '}
              <br />
              <button
                type="submit"
                className="uk-button uk-button-primary uk-margin"
                disabled={uploading}
              >
                {uploading ? 'uploading...' : 'Submit'}
              </button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default FileUpload;
