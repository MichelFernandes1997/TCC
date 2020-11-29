import React, { useState, useEffect, useContext, useRef } from "react";

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

import { useHistory } from "react-router-dom";

import DefaultPhoto from "../../../assets/images/default.png";

import SmilePhoto from "../../../assets/images/smile.png";

import AuthContext from "../../../contexts/auth";

import { Pagination } from "@material-ui/lab";

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

interface Paginate {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
  data: Array<{}>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ProjetosAll: React.FC = () => {
  const classes = useStyles();

  const { ProjetosAll } = useContext(AuthContext);

  const [projetos, setProjetos] = useState<Array<Projeto> | null>(null);

  const [pagination, setPagination] = useState<Paginate | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const pages = useRef<number>(0);

  const page = useRef<number>(0);

  const handleShowProjeto = (id: number) => {
    history.push(`/projeto-show/${id}`);
  };

  const handleChangePage = async (event: {}, value: number) => {
    if (pages.current === 1) {
      return;
    }

    setLoading(true);
    
    const response = await ProjetosAll(`${pagination?.path}?page=${value}`);

    if (response !== false) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      let auxProjetos = (response as unknown) as { data: []};
      
      setProjetos(auxProjetos.data);

      let aux = (response as unknown) as Paginate;

      let removeProperty = 'data';

      let auxPagination = Object.keys(aux).reduce((object: any, key) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        let secondaryAux = (aux as unknown) as any;

        if (key !== removeProperty) {
          object[`${key}`] = secondaryAux[`${key}`];
        }
        return object
      }, {})
      
      pages.current = auxPagination.last_page;

      page.current = auxPagination.current_page;

      setPagination(auxPagination);
    }
  }

  useEffect(() => {
    async function fetchProjetos() {
      const response = await ProjetosAll();

      if (response !== false) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        let auxProjetos = (response as unknown) as { data: []};
          
        setProjetos(auxProjetos.data);

        let aux = (response as unknown) as Paginate;

        let removeProperty = 'data';

        let auxPagination = Object.keys(aux).reduce((object: any, key) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          let secondaryAux = (aux as unknown) as any;

          if (key !== removeProperty) {
            object[`${key}`] = secondaryAux[`${key}`];
          }
          return object
        }, {})
        
        pages.current = auxPagination.last_page;

        page.current = auxPagination.current_page;

        setPagination(auxPagination);
      }
    }

    fetchProjetos();
  }, [ProjetosAll]);

  useEffect(() => {
    if (projetos) {
      setLoading(false);
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
    if (projetos?.length === 0 || !projetos) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "93vh",
          }}
        >
          <h1>Não existem projetos ainda!</h1>
          <img src={SmilePhoto}></img>
        </div>
      );
    }

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
                  <h3>Ong: </h3>
                  <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    component="p"
                  >
                    {projeto?.ong?.nome}
                  </Typography>
                  <h3>Descrição: </h3>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {projeto.descricao.length > 100
                      ? `${projeto.descricao.substr(0, 99)}...`
                      : projeto.descricao}
                  </Typography>
                </CardContent>
                {new Date(projeto.dataTermino).getTime() <= new Date().getTime()
                  ? <CardActions>
                    <Box
                      display="flex"
                      justifyContent="center"
                      style={{ width: "100%" }}
                    >
                      <Button
                        color="secondary"
                        variant="contained"
                        disabled
                        onClick={() => handleShowProjeto(projeto.id)}
                      >
                        Projeto finalizado
                      </Button>

                    </Box>
                  </CardActions>
                  : <CardActions>
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
                }
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} key='pagination'>
            <div className={classes.root} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Pagination count={pages.current} page={page.current} color="primary" onChange={handleChangePage} />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
};

export default ProjetosAll;
