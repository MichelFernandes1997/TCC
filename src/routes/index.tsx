import React, { useContext } from "react";

// import AuthContexto from '../contextos/auth';

import AuthRotas from "./auth.routes";

import AppRotas from "./app.routes";

const Rotas: React.FC = () => {
  const logado /* { logado } */ = false; // useContext(AuthContexto);

  return logado ? <AppRotas /> : <AuthRotas />;
};

export default Rotas;
