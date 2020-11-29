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

import { useHistory } from "react-router-dom";

import AuthContext from "../../../contexts/auth";

import { Pagination } from "@material-ui/lab";

interface ProjetoOng {
  id: number;
  nome: string;
}

interface Projetos {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  endereco: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  ong: ProjetoOng | null;
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

const VoluntarioListProjetosStartTo: React.FC = () => {
  const classes = useStyles();

  const { ListVoluntarioProjetosStartTo, user } = useContext(AuthContext);

  const [projetos, setProjetos] = useState<Array<Projetos> | null>(null);

  const [pagination, setPagination] = useState<Paginate | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const pages = useRef<number>(0);

  const page = useRef<number>(0);

  const history = useHistory();

  const handleShowProjeto = (id: number) => {
    history.push(`/projeto-show/${id}`);
  };

  const handleChangePage = async (event: {}, value: number) => {
    if (pages.current === 1) {
      return;
    }

    setLoading(true);

    let voluntarioId = 0;

    if (user !== null) {
      voluntarioId = user.id;
    }

    const response = await ListVoluntarioProjetosStartTo(voluntarioId, `${pagination?.path}/${voluntarioId}?page=${value}`);

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
    async function fetchListOfVoluntarioProjectsStartTo() {
      if (user !== null) {
        const response = await ListVoluntarioProjetosStartTo(user.id);
        
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

    fetchListOfVoluntarioProjectsStartTo();
  }, [ListVoluntarioProjetosStartTo, user]);

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
            <h1>Você não possui nenhum projeto passado até agora!</h1>
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
                <Grid item xs={3} key={`grid${projeto.id}`}>
                  <Card key={`card${projeto.id}`}>
                    <CardMedia
                      component="img"
                      alt="Capa da ong"
                      height="140"
                      image={DefaultPhoto}
                      title="Capa da ong"
                      key={`cardMedia${projeto.id}`}
                    />
                    <CardContent key={`cardContent${projeto.id}`}>
                      <Typography variant="h6" color="textPrimary" component="p" key={`typography1${projeto.id}`}>
                        {projeto.nome}
                      </Typography>
                      <h3 key={`title1${projeto.id}`}>Descrição: </h3>
                      <Typography variant="body2" color="textPrimary" component="p" key={`typography2${projeto.id}`}>
                        {`${projeto.descricao.substr(0, 100) + "..."}`}
                      </Typography>
                      <h3 key={`title2${projeto.id}`}>Data de inicio é: </h3>
                      <Typography variant="body2" color="textPrimary" key={`typography3${projeto.id}`}>
                        {`${new Date(projeto.dataInicio)}`}
                      </Typography>
                      <h3 key={`title3${projeto.id}`}>Data de término é: </h3>
                      <Typography variant="body2" color="textPrimary" component="p" key={`typography4${projeto.id}`}>
                        {`${new Date(projeto.dataTermino)}`}
                      </Typography>
                      <h3 key={`title4${projeto.id}`}>Nome da ONG: </h3>
                      <Typography variant="body1" color="textPrimary" component="p" key={`typography5${projeto.id}`}>
                        {`${projeto.ong?.nome}`}
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

export default VoluntarioListProjetosStartTo;