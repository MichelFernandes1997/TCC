import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "../components/Navbar";

import Home from "../pages/home";

import Projetos from "../pages/projeto/list";

import ProjetosShow from "../pages/projeto/show";

import ProjetosAll from "../pages/projeto/all";

// eslint-disable-next-line implicit-arrow-linebreak
const SuporteRotas: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/meus-projetos" component={Projetos} />
      <Route exact path="/projetos-all" component={ProjetosAll} />
      <Route exact path="/projeto-show/:id" component={ProjetosShow} />
    </Switch>
  </BrowserRouter>
);

export default SuporteRotas;
