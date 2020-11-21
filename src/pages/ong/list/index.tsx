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

interface ProjetoOng {
  id: number;
  nome: string;
}

interface Ong {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: string;
  cnpj: string;
  email: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  projeto: ProjetoOng | null;
}

const OngsList: React.FC = () => {
  const { ListOngs, user } = useContext(AuthContext);

  const [ongs, setOngs] = useState<Array<Ong> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOngs() {
      if (user !== null) {
        const response = await ListOngs();

        if (response !== false) {
          setOngs(response);
        }
      }
    }

    fetchOngs();
  }, []);

  useEffect(() => {
    if (ongs !== null) {
      setLoading(false);
    }
  }, [ongs]);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  } else {
    return (
      <div>
        {ongs?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "93vh",
            }}
          >
            <h1>Nenhuma ong foi registrada até agora!</h1>
            <img src={SmilePhoto}></img>
          </div>
        ) : (
          ongs?.map((ong, indice) => (
            <p style={{ border: "5px solid purple" }}>
              <h1 style={{ textAlign: "center" }}>{ong.nome}</h1>
              <h1 style={{ textAlign: "center" }}>{ong.id}</h1>
              <h1
                style={{ textAlign: "center" }}
              >{`Adentrou a plataforma em: ${new Date(ong.created_at)}`}</h1>
            </p>
          ))
        )}
      </div>
    );
  }
};

export default OngsList;
