import React from "react";
import { useLocation } from "react-router";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Containers/Login/Login";
import SignUp from "./Containers/SignUp/SignUp";
import Dashboard from "./Containers/Dashboard/Dashboard";

function App() {
  console.log(useLocation());

  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
    </Switch>
  );
}

export default App;
