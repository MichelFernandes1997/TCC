import axios from "axios";

interface OngInput {
  nome: string;
  data: string;
  cnpj: string;
  email: string;
  senha: string;
}

export default function registerOng(ong: OngInput) {
  console.log(ong);
}
