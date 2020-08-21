import axios from "axios";

interface ProjetoInput {
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataTermino: Date;
  endereco: string;
  ong_id: number;
}

interface Response {
  projeto: {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: Date;
    dataTermino: Date;
    endereco: string;
    updated_at: string;
    created_at: string;
  };
}

export default async function CreateProjeto(
  projeto: ProjetoInput
): Promise<Response> {
  const url = "http://uniong-api.local/api/projeto";

  const headers = { "Content-Type": "application/json" } as object;

  let result = axios
    .post(url, projeto, headers)
    .then((result) => result.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response);

        return false;
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
