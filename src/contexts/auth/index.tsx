/* eslint-disable object-curly-newline */
import React, { createContext, ReactNode, useState, useEffect } from "react";

import Login, { Logout } from "../../servicos/auth/index";

import Loading from "../../components/generals/loading";

import registerOng from "../../servicos/register/ong";

interface Children {
  children: ReactNode;
}

interface User {
  username: string;
  email: string;
}

interface InvalidUser {
  errorStatus: number;
  usernameError: string | undefined;
  passwordError: string | undefined;
}

interface Credentials {
  username: string;
  password: string;
}

interface OngInput {
  nome: string;
  dataCriacao: Date;
  cnpj: string;
  email: string;
  descricao: string;
  senha: string;
}

interface AuthContextoDados {
  logado: boolean;
  user: User | null;
  loading: boolean;
  Logar(credentials: Credentials): Promise<void>;
  Deslogar(): Promise<void>;
  RegisterOng(ongInput: OngInput): Promise<boolean | undefined>;
  overrideLoading(): void;
  invalidUser: object | null;
  errorUser: boolean;
}

const AuthContexto = createContext<AuthContextoDados>({} as AuthContextoDados);

export const AuthProvider: React.FC<Children> = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null);

  const [invalidUser, setInvalidUser] = useState<InvalidUser | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const userAuth = localStorage.getItem("@RNUniOng:auth");

    const tokenUser = localStorage.getItem("@RNUniOng:token");

    if (!!userAuth && !!tokenUser) {
      setUser(JSON.parse(userAuth));

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && loading === true) {
      setLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    if (invalidUser !== null) {
      setLoading(false);
    }
  }, [invalidUser]);

  async function Logar(credentials: Credentials) {
    setLoading(true);

    try {
      const { token, user: userResponse } = await Login(credentials);

      setUser(userResponse as User);

      localStorage.setItem("@RNUniOng:auth", JSON.stringify(userResponse));
      localStorage.setItem("@RNUniOng:token", token);
    } catch (err) {
      setInvalidUser(err);
    }
  }

  async function Deslogar() {
    const { logout } = await Logout();

    if (logout) {
      localStorage.removeItem("@RNUniOng:auth");

      localStorage.removeItem("@RNUniOng:token");

      setUser(null);
    }
  }

  async function RegisterOng(ongInput: OngInput) {
    setLoading(true);

    const { ong } = await registerOng(ongInput);

    if (ong) {
      setLoading(false);

      return true;
    } else {
      setLoading(false);
    }
  }

  function overrideLoading() {
    setLoading(!loading);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContexto.Provider
      value={{
        logado: !!user,
        user,
        loading,
        Logar,
        Deslogar,
        RegisterOng,
        overrideLoading,
        invalidUser,
        errorUser: !!invalidUser,
      }}
    >
      {children}
    </AuthContexto.Provider>
  );
};

export default AuthContexto;