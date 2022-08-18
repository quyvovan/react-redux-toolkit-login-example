import React, { useState  } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { logout } from "../slices/auth";

const Logout = (props) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        setLoading(true);
    
        dispatch(logout())
          .unwrap()
          .then(() => {
            props.history.push("/");
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
    };

  return (
    <div className="logout">
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
              <div className="card-content text-center">
              <img src="images/img-black-tea.png" className="img-fluid" alt="Form Logout" />
                <div className="card-head">
                  <h3 className="title">You are Logged Out</h3>
                  <p className="subtitle color-gray">Thank you for using velzon admin template</p>
                </div>
                
                <Formik
                  onSubmit={handleLogout}
                >
                  <Form>
                    <div className="form-group mb-0">
                      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Logout;
