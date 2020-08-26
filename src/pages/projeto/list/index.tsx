import React, { useState, useEffect, useContext } from "react";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Backdrop,
  CircularProgress,
  Container,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import DefaultPhoto from "../../../assets/images/default.png";

import AuthContext from "../../../contexts/auth";

import { useHistory } from "react-router-dom";

const Projetos: React.FC = () => {
  const { MeusProjetos, projetos, setProjetos, user } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const handleShowProjeto = (id: number) => {
    history.push(`/projeto-show/${id}`);
  };

  useEffect(() => {
    async function fetchProjetos() {
      if (user) {
        const response = await MeusProjetos(user.id);

        if (response !== false) {
          setProjetos(response);
        }
      }
    }

    setLoading(true);

    fetchProjetos();

    return () => {
      setProjetos(null);
    };
  }, []);

  useEffect(() => {
    if (projetos) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [projetos]);

  if (loading) {
    return (
      <Container
        maxWidth="xl"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container spacing={6} style={{ marginTop: "2%" }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((conteudo, indice) => (
            <Grid item xs={3}>
              <Card>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={150}
                  width="100%"
                />
                <CardContent>
                  <Typography variant="h6" color="textPrimary" component="p">
                    <Skeleton />
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    <Skeleton />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    <Button color="primary" variant="contained">
                      <Skeleton />
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container
        maxWidth="xl"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container spacing={6} style={{ marginTop: "2%" }}>
          {projetos?.map((projeto, indice) => (
            <Grid item xs={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Capa do projeto"
                  height="140"
                  image={DefaultPhoto}
                  title="Capa do projeto"
                />
                <CardContent>
                  <Typography variant="h6" color="textPrimary" component="p">
                    {projeto.nome}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {projeto.descricao.substr(0, 25) + "..."}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleShowProjeto(projeto.id)}
                    >
                      Detalhes
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
};

export default Projetos;
