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

export async function Logout(): Promise<ResponseLogout> {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    url: "http://uniong-api.local/api/logout",
  } as object;

  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "@RNUniOng:token"
  )}`;

  const response = await axios(options);

  return response.data;
}

export default async function Login(
  credentials: Credentials
): Promise<Response> {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials,
    url: "http://uniong-api.local/api/login",
    withCredentials: true,
  } as object;

  const response = await axios(options);

  return response.data;
}
