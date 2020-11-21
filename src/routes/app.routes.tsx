import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "../components/Navbar";

import Home from "../pages/home";

import Projetos from "../pages/projeto/list";

import ProjetosShow from "../pages/projeto/show";

import ProjetosAll from "../pages/projeto/all";

import ProjetosStartTo from "../pages/projeto/startTo";

import ProjetosStarted from "../pages/projeto/started";

import ProjetosPassed from "../pages/projeto/passed";

import OngsList from "../pages/ong/list";

// eslint-disable-next-line implicit-arrow-linebreak
const SuporteRotas: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/meus-projetos" component={Projetos} />
      <Route exact path="/projetos-all" component={ProjetosAll} />
      <Route exact path="/projeto-show/:id" component={ProjetosShow} />
      <Route exact path="/projetos-startTo" component={ProjetosStartTo} />
      <Route exact path="/projetos-started" component={ProjetosStarted} />
      <Route exact path="/projetos-passed" component={ProjetosPassed} />
      <Route exact path="/ongs-list" component={OngsList} />
    </Switch>
  </BrowserRouter>
);

export default SuporteRotas;
