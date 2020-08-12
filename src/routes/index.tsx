import React, { useContext } from "react";

// import AuthContexto from '../contextos/auth';

import AuthContext from "../contexts/auth";

import AuthRotas from "./auth.routes";

import AppRotas from "./app.routes";

const Rotas: React.FC = () => {
  const { logado } = useContext(AuthContext);

  return logado ? <AppRotas /> : <AuthRotas />;
};

export default Rotas;
