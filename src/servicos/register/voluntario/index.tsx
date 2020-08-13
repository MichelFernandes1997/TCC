import axios from "axios";

interface VoluntarioInput {
  nomeCompleto: string;
  dataNascimento: Date;
  cpf: string;
  email: string;
  senha: string;
}

interface Response {
  voluntario: {
    id: number;
    nome: string;
    dataNascimento: Date;
    cpf: string;
    email: string;
    updated_at: string;
    created_at: string;
    deleted_at: string;
  };
}

export default async function registerVoluntario(
  voluntario: VoluntarioInput
): Promise<Response> {
  const url = "http://uniong-api.local/api/voluntario";

  const headers = { "Content-Type": "application/json" } as object;

  let result = axios
    .post(url, voluntario, headers)
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
