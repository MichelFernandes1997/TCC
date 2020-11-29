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

interface OngProjetos {
  id: number;
  nome: string;
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
    ong: OngProjetos | null;
  }>;
  error: string | null;
}

export default async function listVoluntarioProjetos(voluntarioId: number, url?: string): Promise<Response> {
  if (!url) {
    url = `http://uniong-api.local/api/voluntario/projeto/${voluntarioId}`;
  }
  
  const user = JSON.parse(localStorage.getItem("@RNUniOng:auth") as string) as Voluntario;

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
