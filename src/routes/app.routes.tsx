import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/home";

// eslint-disable-next-line implicit-arrow-linebreak
const SuporteRotas: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default SuporteRotas;
