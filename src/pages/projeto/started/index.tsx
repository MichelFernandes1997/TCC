import React, { useState, useEffect, useContext, useRef } from "react";

import {
  Card,
  Grid,
  Button,
  CardMedia,
  Typography,
  IconButton,
  Snackbar,
  Container,
  Box,
  CardActions,
  CardContent,
  makeStyles
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

/*import DefaultPhotoCarousel from "../../../assets/images/default.png";*/

import DefaultPhoto from "../../../assets/images/default.png";

import SmilePhoto from "../../../assets/images/smile.png";

import AuthContext from "../../../contexts/auth";

import { useHistory } from "react-router-dom";

import { Pagination } from "@material-ui/lab";

interface OngProjeto {
  id: number;
  nome: string;
}

interface VoluntarioProjeto {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface ProjetosWithVoluntarios {
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
  voluntarios: Array<VoluntarioProjeto | undefined>;
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

const ProjetosStarted: React.FC = () => {
  const classes = useStyles();

  const { StartedProjetos, user } = useContext(AuthContext);

  const [projetos, setProjetos] = useState<Array<ProjetosWithVoluntarios> | null>(null);

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
    
    const response = await StartedProjetos(`${pagination?.path}?page=${value}`);

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
      if (user !== null) {
        const response = await StartedProjetos();

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
    }

    fetchProjetos();
  }, [StartedProjetos, user]);

  useEffect(() => {
    if (projetos !== null) {
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
    return (
      <div>
        {projetos?.length === 0 || !projetos ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "93vh",
            }}
          >
            <h1>Nenhum projeto está acontecendo no momento!</h1>
            <img src={SmilePhoto}></img>
          </div>
        ) : (
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
                      <h3>Descrição: </h3>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {`${projeto.descricao.substr(0, 100) + "..."}`}
                      </Typography>
                      <h3>Endereço: </h3>
                      <Typography variant="body2" color="textPrimary">
                        {`${projeto.endereco}`}
                      </Typography>
                      <h3>Termina em: </h3>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {`${Math.round(Math.abs(new Date(projeto.dataInicio).getTime() - new Date(projeto.dataTermino).getTime()) / (24 * 60 * 60 * 1000))} dias`}
                      </Typography>
                      <h3>Total de voluntários: </h3>
                      <Typography variant="body2" color="textPrimary">
                        {`${projeto?.voluntarios.length}`}
                      </Typography>
                      {projeto?.voluntarios.map((voluntario) => {
                        if (voluntario?.id === user?.id) {
                          return (
                            <><h3></h3>
                            <Typography variant="body1" color="secondary" component="p">
                              Você é voluntário nesse projeto
                            </Typography></>
                          );
                        }
                      })}
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
              <Grid item xs={12} key='pagination'>
                <div className={classes.root} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <Pagination count={pages.current} page={page.current} color="primary" onChange={handleChangePage} />
                </div>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    );
  }
};

export default ProjetosStarted;
