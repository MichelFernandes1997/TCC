import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../pages/login";

import Ong from "../pages/register/ong";

import Voluntario from "../pages/register/voluntario";

// eslint-disable-next-line implicit-arrow-linebreak
const AuthRotas: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register/ong" component={Ong} />
      <Route exact path="/register/voluntario" component={Voluntario} />
    </Switch>
  </BrowserRouter>
);

export default AuthRotas;
