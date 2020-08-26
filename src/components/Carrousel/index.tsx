import React, { useEffect, useState, useRef, useContext } from "react";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

import DefaultPhotoCarousel from "../../assets/images/default.jpeg";

import LooksOneIcon from "@material-ui/icons/LooksOne";

import LooksTwoIcon from "@material-ui/icons/LooksTwo";

import Looks3Icon from "@material-ui/icons/Looks3";

import AuthContext from "../../contexts/auth";

import { useHistory } from "react-router-dom";

interface Projetos {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
}

interface Props {
  carouselSelected: number;
}

const useStyles = makeStyles(() => ({
  card1: {
    borderRadius: 5,
    width: "75%",
    height: "250px",
    marginLeft: "25%",
  },
  card2: {
    borderRadius: 5,
    height: "300px",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 300px",
  },
  card3: {
    borderRadius: 5,
    height: "250px",
    width: "75%",
  },
  marginTop: {
    marginTop: "3%",
  },
  card1Skeleton: {
    borderRadius: 5,
    height: "450px",
    width: "75%",
    marginLeft: "25%",
  },
  card2Skeleton: {
    borderRadius: 5,
    height: "500px",
    width: "100%",
  },
  card3Skeleton: {
    borderRadius: 5,
    height: "450px",
    width: "75%",
  },
}));

export default function CarouselSlide(props: Props) {
  const { projetos, setProjetos } = useContext(AuthContext);

  const history = useHistory();

  const { carouselSelected } = props;

  const [carouselContent, setCarouselContent] = useState<Array<
    Projetos
  > | null>(null);

  const first = useRef<number | null>(null);

  const last = useRef<number | null>(null);

  const classes = useStyles();

  const handleShowProjeto = (id: number) => {
    history.push(`/projeto-show/${id}`);
  };

  useEffect(() => {
    return () => {
      setProjetos(null);
    };
  }, []);

  useEffect(() => {
    if (projetos !== null) {
      first.current = projetos[0].id;

      last.current = projetos[2].id;

      setCarouselContent([projetos[0], projetos[1], projetos[2]]);
    } else {
      setCarouselContent(null);
    }
  }, [projetos]);

  useEffect(() => {
    if (carouselContent !== null) {
      if (carouselSelected === 0 && carouselContent[0].id === first.current) {
        setCarouselContent([
          carouselContent[2],
          carouselContent[0],
          carouselContent[1],
        ]);
      } else if (
        carouselSelected === 0 &&
        carouselContent[2].id === first.current
      ) {
        setCarouselContent([
          carouselContent[1],
          carouselContent[2],
          carouselContent[0],
        ]);
      } else if (
        carouselSelected === 1 &&
        carouselContent[1].id === first.current
      ) {
        setCarouselContent([
          carouselContent[1],
          carouselContent[2],
          carouselContent[0],
        ]);
      } else if (
        carouselSelected === 1 &&
        carouselContent[2].id === first.current
      ) {
        setCarouselContent([
          carouselContent[2],
          carouselContent[0],
          carouselContent[1],
        ]);
      } else if (
        carouselSelected === 2 &&
        carouselContent[2].id === last.current
      ) {
        setCarouselContent([
          carouselContent[1],
          carouselContent[2],
          carouselContent[0],
        ]);
      } else if (
        carouselSelected === 2 &&
        carouselContent[0].id === last.current
      ) {
        setCarouselContent([
          carouselContent[2],
          carouselContent[0],
          carouselContent[1],
        ]);
      }
    }
  }, [carouselSelected]);

  return (
    <Grid container className={classes.marginTop}>
      <Box display="flex" alignItems="center" style={{ width: "100%" }}>
        {carouselContent !== null
          ? carouselContent.map((conteudo, indice) => (
              <Grid item xs>
                <Card
                  className={
                    indice === 0
                      ? classes.card1
                      : indice === 1
                      ? classes.card2
                      : classes.card3
                  }
                  style={{
                    backgroundImage: `url(${DefaultPhotoCarousel})`,
                  }}
                >
                  <Grid container style={{ height: "100%" }}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        backgroundColor: "rgba(2, 2, 2, 0.4)",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        {conteudo.id === first.current ? (
                          <LooksOneIcon />
                        ) : conteudo.id !== first.current &&
                          conteudo.id !== last.current ? (
                          <LooksTwoIcon />
                        ) : (
                          <Looks3Icon />
                        )}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        {conteudo.nome}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        backgroundColor: "rgba(2, 2, 2, 0.4)",
                        padding: "10px",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{ height: "100%" }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {conteudo.descricao.substr(0, 25) + "..."}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        backgroundColor: "rgba(2, 2, 2, 0.4)",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{ height: "100%" }}
                      >
                        <Button
                          color="secondary"
                          onClick={() => handleShowProjeto(conteudo.id)}
                        >
                          Ver mais
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          : [0, 1, 2].map((conteudo, indice) => (
              <Grid
                item
                xs
                style={{ marginTop: "-120px", marginBottom: "-80px" }}
              >
                <Skeleton
                  className={
                    indice === 0
                      ? classes.card1Skeleton
                      : indice === 1
                      ? classes.card2Skeleton
                      : classes.card3Skeleton
                  }
                />
              </Grid>
            ))}
      </Box>
    </Grid>
  );
}
