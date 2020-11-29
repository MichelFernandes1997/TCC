import axios from "axios";

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

interface Response {
  projetos: Array<{
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataTermino: string;
    endereco: string;
    updated_at: string;
    created_at: string;
    deleted_at: string;
    ong: {
      id: number;
      nome: string;
    } | null;
  }>;
  error: string | null;
}

export default async function allProjetos(url?: string): Promise<Response> {
  if (!url) {
    url = "http://uniong-api.local/api/all/projeto";
  }

  const user = JSON.parse(localStorage.getItem("@RNUniOng:auth") as string) as
    | Voluntario
    | Ong;

  axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;

  let result = axios
    .get(url)
    .then((result) => result.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response);

        return { error: error.response.statusText };
      } else if (error.request) {
        console.log(error.request);

        return false;
      } else {
        console.log(error);

        return false;
      }
    });

  return result;
}
