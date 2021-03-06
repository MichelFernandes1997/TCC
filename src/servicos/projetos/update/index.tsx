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

interface Voluntarios {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Response {
  projeto: {
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
    voluntarios: Array<Voluntarios | undefined>;
  };
  error: string | null;
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

export default async function updateProjeto(
  id: number,
  atributtes: UpdateAttributes
): Promise<Response> {
  const url = `http://uniong-api.local/api/projeto/${id}`;

  const user = JSON.parse(localStorage.getItem("@RNUniOng:auth") as string) as
    | Voluntario
    | Ong;

  axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;

  const data = atributtes;

  const headers = { "Content-Type": "application/json" } as object;

  let result = axios
    .put(url, data, headers)
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
