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
} from "@material-ui/core";

import DefaultPhoto from "../../../assets/images/default.png";

import AuthContext from "../../../contexts/auth";

interface Ong {
  nome: string;
}

interface Projetos {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  ong: Ong | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const ListProjetos: React.FC = () => {
  const classes = useStyles();

  const { GetProjetos } = useContext(AuthContext);

  const [projetos, setProjetos] = useState<Array<Projetos> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProjetos() {
      const response = await GetProjetos();

      if (response !== false) {
        setProjetos(response);
      }
    }

    fetchProjetos();
  }, []);

  useEffect(() => {
    if (projetos) {
      setLoading(false);
    }
  }, [projetos]);

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <Grid container spacing={6} style={{ marginTop: "4%" }}>
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
                <Typography variant="body2" color="textPrimary" component="p">
                  {projeto.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ width: "100%" }}
                >
                  <Button color="primary" variant="contained">
                    Detalhes
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default ListProjetos;
