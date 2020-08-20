import React, { useEffect, useState } from "react";

import {
  Card,
  makeStyles,
  Grid,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import DefaultPhotoCarousel from "../../assets/images/default.jpeg";

import LooksOneIcon from "@material-ui/icons/LooksOne";

import LooksTwoIcon from "@material-ui/icons/LooksTwo";

import Looks3Icon from "@material-ui/icons/Looks3";

interface Carousel {
  title: string;
}

interface Props {
  content: Array<Carousel>;
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
    width: "75%",
    height: "250px",
  },
  marginTop: {
    marginTop: "3%",
  },
}));

export default function CarouselSlide(props: Props) {
  const { content, carouselSelected } = props;
  const [carouselContent, setCarouselContent] = useState(content);
  const classes = useStyles();
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    if (carouselSelected === 0 && carouselContent[0].title === "1") {
      setCarouselContent([
        carouselContent[2],
        carouselContent[0],
        carouselContent[1],
      ]);
    } else if (carouselSelected === 0 && carouselContent[2].title === "1") {
      setCarouselContent([
        carouselContent[1],
        carouselContent[2],
        carouselContent[0],
      ]);
    } else if (carouselSelected === 1 && carouselContent[1].title === "1") {
      setCarouselContent([
        carouselContent[1],
        carouselContent[2],
        carouselContent[0],
      ]);
    } else if (carouselSelected === 1 && carouselContent[2].title === "1") {
      setCarouselContent([
        carouselContent[2],
        carouselContent[0],
        carouselContent[1],
      ]);
    } else if (carouselSelected === 2 && carouselContent[2].title === "3") {
      setCarouselContent([
        carouselContent[1],
        carouselContent[2],
        carouselContent[0],
      ]);
    } else if (carouselSelected === 2 && carouselContent[0].title === "3") {
      setCarouselContent([
        carouselContent[2],
        carouselContent[0],
        carouselContent[1],
      ]);
    }
  }, [carouselSelected]);

  return (
    <Grid container className={classes.marginTop}>
      <Box display="flex" alignItems="center" style={{ width: "100%" }}>
        {carouselContent.map((conteudo, indice) => (
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
              {/*indice === 1 ? (
                <Box style={{ height: "55%" }} />
              ) : (
                <Box style={{ height: "45%" }} />
              )*/}

              <Grid container style={{ height: "100%" }}>
                <Grid item xs={12} style={{ height: "60%" }}></Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    backgroundColor: "rgba(2, 2, 2, 0.4)",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={{ paddingLeft: "10px" }}
                  >
                    {conteudo.title === "1" ? (
                      <LooksOneIcon />
                    ) : conteudo.title === "2" ? (
                      <LooksTwoIcon />
                    ) : (
                      <Looks3Icon />
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: "center" }}
                  >
                    This is a description!!!!!!!!!
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgba(2, 2, 2, 0.4)",
                  }}
                >
                  <Button color="secondary">Ver mais</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
}
