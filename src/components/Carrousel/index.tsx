import React, { useEffect, useState } from "react";

import { Card, makeStyles, Grid, Box } from "@material-ui/core";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "25%",
  },
  card2: {
    borderRadius: 5,
    textAlign: "center",
    height: "300px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card3: {
    borderRadius: 5,
    textAlign: "center",
    width: "75%",
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alignOnMiddle: {
    marginTop: "3%",
  },
}));

export default function CarouselSlide(props: Props) {
  const { content, carouselSelected } = props;
  const [carouselContent, setCarouselContent] = useState(content);
  const classes = useStyles();

  useEffect(() => {
    if (carouselSelected === 0 && carouselContent[0].title === "Slide 1") {
      setCarouselContent([
        carouselContent[2],
        carouselContent[0],
        carouselContent[1],
      ]);
    } else if (
      carouselSelected === 0 &&
      carouselContent[2].title === "Slide 1"
    ) {
      setCarouselContent([
        carouselContent[1],
        carouselContent[2],
        carouselContent[0],
      ]);
    } else if (
      carouselSelected === 1 &&
      carouselContent[1].title === "Slide 1"
    ) {
      setCarouselContent([
        carouselContent[1],
        carouselContent[2],
        carouselContent[0],
      ]);
    } else if (
      carouselSelected === 1 &&
      carouselContent[2].title === "Slide 1"
    ) {
      setCarouselContent([
        carouselContent[2],
        carouselContent[0],
        carouselContent[1],
      ]);
    } else if (
      carouselSelected === 2 &&
      carouselContent[2].title === "Slide 3"
    ) {
      setCarouselContent([
        carouselContent[1],
        carouselContent[2],
        carouselContent[0],
      ]);
    } else if (
      carouselSelected === 2 &&
      carouselContent[0].title === "Slide 3"
    ) {
      setCarouselContent([
        carouselContent[2],
        carouselContent[0],
        carouselContent[1],
      ]);
    }
  }, [carouselSelected]);

  return (
    <Grid container className={classes.alignOnMiddle}>
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
            >
              <h1>{conteudo.title}</h1>
            </Card>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
}
