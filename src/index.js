import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/css/poc-sica.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datetime/css/react-datetime.css";

import AdminLayout from "layouts/Admin.js";
import Login from "components/Login/Login.js";

import { isAuthenticated } from "./services/Auth.js";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} />} />
      <PrivateRoute path="/admin" component={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
