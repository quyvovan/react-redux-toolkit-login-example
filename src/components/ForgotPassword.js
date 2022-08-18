import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { forgot } from "../slices/auth";
import { clearMessage } from "../slices/message";

const ForgotPassword = (props) => {
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
  });

  const handleResetPassword = (formValue) => {
    const { email } = formValue;

    setLoading(true);

    dispatch(forgot({ email }))
      .unwrap()
      .then((response) => {
        if(response.success){
          props.history.push("/");
          window.location.reload();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="forgot">
      <div className="card">
        <div className="card-body">
          <div className="logo">
            <a href="/" title="Logo">
              <img src="images/logo.png" className="img-fluid" alt="Logo" />
            </a>
          </div>
          <div className="row no-gutters align-items-center">
            <div className="col-12 col-sm-6">
              <div className="card-image">
                <div className="image">
                  <img src="images/img-form-login.png" className="img-fluid" alt="Form Login" />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="card-content">
                <div className="card-head">
                  <h3 className="title">Forgot Password?</h3>
                  <p className="subtitle color-gray">Reset password with velzon</p>
                </div>

                <div className="text-center">
                  <img src="images/icon-send-email.svg" className="img-fluid img-email" alt="Send Email" />
                </div>
                <div className="alert alert-warning text-center" role="alert">
                  Enter your email and instructions will be sent to you!
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleResetPassword}
              >
                <Form>
                    <>
                      <div className="form-group mb-4">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className="form-control" placeholder="Enter email address" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mt-2"
                        />
                      </div>

                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                          {loading && (
                            <span className="spinner-border spinner-border-sm mr-1"></span>
                          )}
                          Send Reset Link
                          </button>
                      </div>

                      <div className="form-group mb-0 mt-5">
                          <p className="text-center">
                            Wait, I remember my password...
                            <a className="ml-2 text-decoration-underline" href="/login" title="Login">Click here</a>
                          </p>
                      </div>
                    </>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
