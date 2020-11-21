import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  Grid,
  Button,
  CardMedia,
  Typography,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import DefaultPhotoCarousel from "../../../assets/images/default.png";

import SmilePhoto from "../../../assets/images/smile.png";

import AuthContext from "../../../contexts/auth";

interface OngProjeto {
  id: number;
  nome: string;
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  endereco: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  ong: OngProjeto | null;
}

const ProjetosStartTo: React.FC = () => {
  const { StartToProjetos, user } = useContext(AuthContext);

  const [projetos, setProjetos] = useState<Array<Projeto> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjetos() {
      if (user !== null) {
        const response = await StartToProjetos(user.id);

        if (response !== false) {
          setProjetos(response);
        }
      }
    }

    fetchProjetos();
  }, []);

  useEffect(() => {
    if (projetos !== null) {
      setLoading(false);
    }
  }, [projetos]);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  } else {
    return (
      <div>
        {projetos?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "93vh",
            }}
          >
            <h1>Você não possui projetos que iniciarão em breve!</h1>
            <img src={SmilePhoto}></img>
          </div>
        ) : (
          projetos?.map((projeto, indice) => (
            <p>
              <h1 style={{ textAlign: "center" }}>{projeto.nome}</h1>
              <h1 style={{ textAlign: "center" }}>{projeto.id}</h1>
              <h1 style={{ textAlign: "center" }}>{projeto.dataInicio}</h1>
            </p>
          ))
        )}
      </div>
    );
  }
};

export default ProjetosStartTo;
