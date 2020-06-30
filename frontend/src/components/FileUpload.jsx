import React from "react";

import { Formik } from "formik";
import * as yup from "yup";

const FileUpload = () => {
  return (
    <div className="uk-container">
      <Formik
        initialValues={{ file: null }}
        onSubmit={(values) => {
          alert("File loaded succesfully");
        }}
        validationSchema={yup.object().shape({
          file: yup.mixed().required(),
        })}
        render={({ values, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit} className="uk-form">
              <div>
                <label
                  style={{ margin: "1em" }}
                  for="file"
                  className="uk-text-large uk-margin-medium uk-form-label"
                >
                  Upload Assignment
                </label>
                <input
                  style={{ width: "30em", marginBottom: "0.2em" }}
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="uk-input uk-form-width-medium"
                />
                <div>{values.file && values.file.name}</div>
              </div>
              <button type="submit" className="uk-button uk-button-primary">
                submit
              </button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default FileUpload;
