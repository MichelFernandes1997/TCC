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

import { Pagination } from "@material-ui/lab";

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
  projetos: Array<ProjetoOng> | null;
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

const OngsList: React.FC = () => {
  const classes = useStyles();

  const { ListOngs, user } = useContext(AuthContext);

  const [ongs, setOngs] = useState<Array<Ong> | null>(null);

  const [pagination, setPagination] = useState<Paginate | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const pages = useRef<number>(0);

  const page = useRef<number>(0);

  const handleChangePage = async (event: {}, value: number) => {
    if (pages.current === 1) {
      return;
    }

    setLoading(true);

    const response = await ListOngs(`${pagination?.path}?page=${value}`);

    if (response !== false) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      let auxOng = (response as unknown) as { data: []};
      
      setOngs(auxOng.data);

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
    async function fetchOngs() {
      if (user !== null) {
        const response = await ListOngs();

        if (response !== false) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          let auxOng = (response as unknown) as { data: []};
          
          setOngs(auxOng.data);

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

    fetchOngs();
  }, [ListOngs, user]);

  useEffect(() => {
    if (ongs !== null) {
      setLoading(false);
    }
  }, [ongs]);

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
        {ongs?.length === 0 || !ongs ? (
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
          <Container
            maxWidth="xl"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container spacing={6} style={{ marginTop: "2%" }}>
              {ongs?.map((ong, indice) => (
                <Grid item xs={3} key={`grid${ong.id}`}>
                  <Card key={`card${ong.id}`}>
                    <CardMedia
                      component="img"
                      alt="Capa da ong"
                      height="140"
                      image={DefaultPhoto}
                      title="Capa da ong"
                      key={`cardMedia${ong.id}`}
                    />
                    <CardContent key={`cardContent${ong.id}`}>
                      <Typography variant="h6" color="textPrimary" component="p" key={`typography1${ong.id}`}>
                        {ong.nome}
                      </Typography>
                      <h3 key={`title1${ong.id}`}>Descrição: </h3>
                      <Typography variant="body2" color="textPrimary" component="p" key={`typography2${ong.id}`}>
                        {`${ong.descricao.substr(0, 100) + "..."}`}
                      </Typography>
                      <h3 key={`title2${ong.id}`}>Fundada em: </h3>
                      <Typography variant="body2" color="textPrimary" key={`typography3${ong.id}`}>
                        {`${new Date(ong.dataCriacao)}`}
                      </Typography>
                      <h3 key={`title3${ong.id}`}>Email para contato: </h3>
                      <Typography variant="body2" color="textPrimary" component="p" key={`typography4${ong.id}`}>
                        {`${ong.email}`}
                      </Typography>
                      <h3 key={`title4${ong.id}`}>Número de projetos: </h3>
                      <Typography variant="body2" color="textPrimary" component="p" key={`typography5${ong.id}`}>
                        {`${ong.projetos?.length}`}
                      </Typography>
                    </CardContent>
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

export default OngsList;
