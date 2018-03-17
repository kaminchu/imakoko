// @flow
import React from "react";
import { HashRouter , Route, Switch } from "react-router-dom";
import Map from "./components/Map";
import Panel from "./components/Panel";

const Router = () => (
  <HashRouter>
      <Switch>
        <Route exact path="/" component={ Panel } />
        <Route path="/map/:id" component={ Map } />
      </Switch>
  </HashRouter>
);

export default Router;