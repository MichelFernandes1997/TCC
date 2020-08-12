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
      "content-type": "application/x-www-form-urlencoded",
    },
    url: "http://auth.local/api/logout",
  } as object;

  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "@RNladetec:token"
  )}`;

  const response = await axios(options);

  return response.data;
}

export default async function Login(
  credentials: Credentials
): Promise<Response> {
  const params = {
    username: credentials.username,
    password: credentials.password,
  };

  const data = Object.entries(params)
    // eslint-disable-next-line implicit-arrow-linebreak
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");

  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data,
    url: "http://auth.local/api/login",
    withCredentials: true,
  } as object;

  const response = await axios(options);

  return response.data;
}
