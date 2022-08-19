import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <>
        <main className="mcv">
            <div className="container">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/forgot_password" component={ForgotPassword} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
            </div>
        </main>
        <footer>
            <p className="p-2 text-center mb-0">© 2022 Datafirst. Powered by NetDev</p>
        </footer>
      </>
    </Router>
  );
};

export default App;
