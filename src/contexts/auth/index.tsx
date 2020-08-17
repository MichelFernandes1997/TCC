/* eslint-disable object-curly-newline */
import React, { createContext, ReactNode, useState, useEffect } from "react";

import Login, { Logout } from "../../servicos/auth/index";

import Loading from "../../components/generals/loading";

import registerOng from "../../servicos/register/ong";

import registerVoluntario from "../../servicos/register/voluntario";

interface Children {
  children: ReactNode;
}

interface Voluntario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  token: string;
}

interface Ong {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  dataCriacao: string;
  descricao: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  token: string;
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

interface VoluntarioInput {
  nomeCompleto: string;
  dataNascimento: Date;
  cpf: string;
  email: string;
  senha: string;
}

interface AuthContextoDados {
  logado: boolean;
  user: Voluntario | Ong | null;
  loading: boolean;
  Logar(credentials: Credentials): Promise<void>;
  Deslogar(): Promise<void>;
  RegisterOng(ongInput: OngInput): Promise<boolean | undefined>;
  RegisterVoluntario(
    voluntarioInput: VoluntarioInput
  ): Promise<boolean | undefined>;
  overrideLoading(): void;
  invalidUser: object | null;
  errorUser: boolean;
}

const AuthContexto = createContext<AuthContextoDados>({} as AuthContextoDados);

export const AuthProvider: React.FC<Children> = ({ children }: Children) => {
  const [user, setUser] = useState<Voluntario | Ong | null>(null);

  const [invalidUser, setInvalidUser] = useState<InvalidUser | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const userAuth = localStorage.getItem("@RNUniOng:auth");

    //const tokenUser = localStorage.getItem("@RNUniOng:token");

    if (!!userAuth /* && !!tokenUser */) {
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
      const { user: userResponse } = await Login(credentials);

      if (userResponse !== null) {
        setUser(userResponse);
      }

      localStorage.setItem("@RNUniOng:auth", JSON.stringify(userResponse));
      // localStorage.setItem("@RNUniOng:token", token);
    } catch (err) {
      setInvalidUser(err);
    }
  }

  async function Deslogar() {
    const { logout } = await Logout();

    if (logout) {
      localStorage.removeItem("@RNUniOng:auth");

      // localStorage.removeItem("@RNUniOng:token");

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

  async function RegisterVoluntario(voluntarioInput: VoluntarioInput) {
    setLoading(true);

    const { voluntario } = await registerVoluntario(voluntarioInput);

    if (voluntario) {
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
        RegisterVoluntario,
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
