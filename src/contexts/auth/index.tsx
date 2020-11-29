/* eslint-disable object-curly-newline */
import React, { createContext, ReactNode, useState, useEffect } from "react";

import Login, { Logout } from "../../servicos/auth/index";

import Loading from "../../components/generals/loading";

import registerOng from "../../servicos/register/ong";

import registerVoluntario from "../../servicos/register/voluntario";

import getProjetos from "../../servicos/home";

import meusProjetos from "../../servicos/projetos/list";

import allProjetos from "../../servicos/projetos/all";

import showProjeto from "../../servicos/projetos/show";

import updateProjeto from "../../servicos/projetos/update";

import startToProjetos from "../../servicos/projetos/startTo";

import startedProjetos from "../../servicos/projetos/started";

import passedProjetos from "../../servicos/projetos/passed";

import listOngs from "../../servicos/ongs/list";

import listVoluntarioProjetos from "../../servicos/voluntarios/list";

import listVoluntarioProjetosPassed from "../../servicos/voluntarios/passed";

import listVoluntarioProjetosStartTo from "../../servicos/voluntarios/startTo";

interface Children {
  children: ReactNode;
}

interface Voluntario {
  type: "voluntario";
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
  type: "ong";
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

interface OngProjetos {
  id: number;
  nome: string;
}

interface VoluntarioProjeto {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Projetos {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  endereco: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  ong: OngProjetos | null;
}

interface ProjetosWithVoluntarios {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  endereco: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  ong: OngProjetos | null;
  voluntarios: Array<VoluntarioProjeto | undefined>;
}

interface UpdateAttributes {
  nome?: string;
  descricao?: string;
  dataInicio?: Date;
  dataTermino?: Date;
  endereco?: string;
  voluntario_id?: number;
  detach_voluntario_id?: number;
}

interface ProjetoOng {
  id: number;
  nome: string;
}

interface Ongs {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: string;
  cnpj: string;
  email: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  projetos: Array<ProjetoOng> | null;
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
  GetProjetos(): Promise<Array<Projetos> | false>;
  MeusProjetos(ongId: number, url?: string): Promise<Array<Projetos> | false>;
  ProjetosAll(url?: string): Promise<Array<Projetos> | false>;
  ShowProjeto(id: number): Promise<ProjetosWithVoluntarios | false>;
  StartToProjetos(ongId: number, url?: string): Promise<Array<Projetos> | false>;
  StartedProjetos(url?: string): Promise<Array<Projetos> | false>;
  PassedProjetos(url?: string): Promise<Array<Projetos> | false>;
  ListOngs(url?: string): Promise<Array<Ongs> | false>;
  UpdateProjeto(
    id: number,
    attributtes: UpdateAttributes
  ): Promise<ProjetosWithVoluntarios | false>;
  invalidUser: object | null;
  errorUser: boolean;
  projetos: Array<Projetos> | null;
  setProjetos(projetos: Array<Projetos> | null): void;
  ListVoluntarioProjetos(voluntarioId: number, url?: string): Promise<Array<Projetos> | false>;
  ListVoluntarioProjetosPassed(voluntarioId: number, url?: string): Promise<Array<Projetos> | false>;
  ListVoluntarioProjetosStartTo(voluntarioId: number, url?: string): Promise<Array<Projetos> | false>;
}

const AuthContexto = createContext<AuthContextoDados>({} as AuthContextoDados);

export const AuthProvider: React.FC<Children> = ({ children }: Children) => {
  const [user, setUser] = useState<Voluntario | Ong | null>(null);

  const [invalidUser, setInvalidUser] = useState<InvalidUser | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [projetos, setProjetos] = useState<Array<Projetos> | null>(null);

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

      setUser(null);

      window.location.href = "/";
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

  async function GetProjetos() {
    const response = await getProjetos();

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function MeusProjetos(ongId: number, url?: string) {
    let response;

    if (url) {
      response = await meusProjetos(ongId, url);
    } else {
      response = await meusProjetos(ongId);
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function ProjetosAll(url?: string) {
    let response;

    if (url) {
      response = await allProjetos(url);
    } else {
      response = await allProjetos();
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function ShowProjeto(id: number) {
    const response = await showProjeto(id);

    if (response.projeto) {
      return response.projeto;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function StartedProjetos(url?: string) {
    let response;

    if (url) {
      response = await startedProjetos(url);
    } else {
      response = await startedProjetos();
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function StartToProjetos(ongId: number, url?: string) {
    let response;

    if (url) {
      response = await startToProjetos(ongId, url);
    } else {
      response = await startToProjetos(ongId);
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function PassedProjetos(url?: string) {
    let response;

    if (url) {
      response = await passedProjetos(url);
    } else {
      response = await passedProjetos();
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function ListOngs(url?: string) {
    let response;

    if (url) {
      response = await listOngs(url);
    } else {
      response = await listOngs();
    }

    if (response.ongs) {
      return response.ongs;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function UpdateProjeto(id: number, attributtes: UpdateAttributes) {
    const response = await updateProjeto(id, attributtes);

    if (response.projeto) {
      return response.projeto;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function ListVoluntarioProjetos(voluntarioId: number, url?: string) {
    let response;

    if (url) {
      response = await listVoluntarioProjetos(voluntarioId, url);
    } else {
      response = await listVoluntarioProjetos(voluntarioId);
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function ListVoluntarioProjetosPassed(voluntarioId: number, url?: string) {
    let response;

    if (url) {
      response = await listVoluntarioProjetosPassed(voluntarioId, url);
    } else {
      response = await listVoluntarioProjetosPassed(voluntarioId);
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
  }

  async function ListVoluntarioProjetosStartTo(voluntarioId: number, url?: string) {
    let response;

    if (url) {
      response = await listVoluntarioProjetosStartTo(voluntarioId, url);
    } else {
      response = await listVoluntarioProjetosStartTo(voluntarioId);
    }

    if (response.projetos) {
      return response.projetos;
    } else if (response.error) {
      if (response.error === "Unauthorized") {
        localStorage.removeItem("@RNUniOng:auth");

        setUser(null);
      }

      return false;
    } else {
      return false;
    }
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
        GetProjetos,
        MeusProjetos,
        ProjetosAll,
        ShowProjeto,
        StartToProjetos,
        StartedProjetos,
        PassedProjetos,
        ListOngs,
        UpdateProjeto,
        invalidUser,
        errorUser: !!invalidUser,
        projetos,
        setProjetos,
        ListVoluntarioProjetos,
        ListVoluntarioProjetosPassed,
        ListVoluntarioProjetosStartTo
      }}
    >
      {children}
    </AuthContexto.Provider>
  );
};

export default AuthContexto;
