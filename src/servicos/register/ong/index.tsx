import axios from "axios";

interface OngInput {
  nome: string;
  data: Date;
  cnpj: string;
  email: string;
  senha: string;
}

export default async function registerOng(ong: OngInput) {
  return true;
}
