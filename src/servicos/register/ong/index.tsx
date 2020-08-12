import axios from "axios";

interface OngInput {
  nome: string;
  dataCriacao: Date;
  cnpj: string;
  email: string;
  descricao: string;
  senha: string;
}

interface Response {
  ong: {
    id: number;
    nome: string;
    dataCriacao: Date;
    cnpj: string;
    email: string;
    descricao: string;
    updated_at: string;
    created_at: string;
  };
}

export default async function registerOng(ong: OngInput): Promise<Response> {
  const url = "http://uniong-api.local/api/ong";

  const headers = { "Content-Type": "application/json" } as object;

  let result = axios
    .post(url, ong, headers)
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
