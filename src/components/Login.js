import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

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
                  <h3 className="title">Welcome Back !</h3>
                  <p className="subtitle color-gray">Sign in to continue to Datafirst.</p>
                </div>
              </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Field name="username" type="text" placeholder="Enter username" className="form-control" />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>

                    <div className="form-group">
                      <div className="d-flex">
                        <label htmlFor="password">Password</label>
                        <a className="ml-auto color-gray" href="/forgot_password" title="Forgot password?">Forgot password?</a>
                      </div>
                      <Field name="password" type="password" placeholder="Enter password" className="form-control" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>

                    <div className="form-group">
                      <Field type="checkbox" name="remember" />
                      <label htmlFor="remember">Remember me</label>
                      <ErrorMessage
                        name="remember"
                        component="div"
                        className="text-danger mt-2"
                      />
                    </div>

                    <div className="form-group mb-0">
                      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        <span>Sign In</span>
                      </button>
                    </div>
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

export default Login;
