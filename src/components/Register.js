import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="login">
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
                  <h3 className="title">Register Account</h3>
                  <p className="subtitle color-gray">Wellcome to Datafirst.</p>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
              >
                <Form>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Field 
                          name="username" 
                          type="text" 
                          placeholder="Enter User Name" 
                          className="form-control" 
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-danger mt-2"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field 
                          name="email" 
                          type="email" 
                          placeholder="Enter Email" 
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mt-2"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          name="password"
                          type="password" 
                          placeholder="Enter Password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mt-2"
                        />
                      </div>

                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
           </div>
        </div>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
