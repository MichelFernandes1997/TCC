import axios from "axios";

interface Response {
  token: string;
  user: object;
}

interface ResponseLogout {
  logout: boolean;
}

interface Credentials {
  username: string;
  password: string;
}

interface Voluntario {
  user: {
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
  };
}

interface Ong {
  user: {
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
  };
}

interface AuthVoluntario {
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

interface AuthOng {
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

export async function Logout(): Promise<ResponseLogout> {
  const options = {
    method: "POST",
    url: "http://uniong-api.local/api/logout",
  } as object;

  const auth = JSON.parse(localStorage.getItem("@RNUniOng:auth") as string) as
    | AuthVoluntario
    | AuthOng;

  axios.defaults.headers.common.Authorization = `Bearer ${auth.token}`;

  const response = await axios(options);

  return response.data;
}

export default async function Login(
  credentials: Credentials
): Promise<Voluntario | Ong> {
  const url = "http://uniong-api.local/api/login";

  const headers = { "content-type": "application/json" } as object;

  const response = axios
    .post(url, credentials, headers)
    .then((result) => result.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response);

        return null;
      } else if (error.request) {
        console.log(error.request);

        return null;
      } else {
        console.log(error);

        return null;
      }
    });

  return response;
}
