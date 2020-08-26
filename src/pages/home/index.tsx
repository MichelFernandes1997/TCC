import React, { useState, useContext, useEffect } from "react";

import { Radio, Box, FormControlLabel, Container } from "@material-ui/core";

import CarouselSlide from "../../components/Carrousel";

import ListProjetos from "../../components/Projetos/ListProjetos";

import LooksOneIcon from "@material-ui/icons/LooksOne";

import LooksTwoIcon from "@material-ui/icons/LooksTwo";

import Looks3Icon from "@material-ui/icons/Looks3";

const Home: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(event.target.value));
  };

  return (
    <Container maxWidth="xl">
      <CarouselSlide carouselSelected={selectedValue} />

      <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
        <FormControlLabel
          value="bottom"
          control={
            <Radio
              checked={selectedValue === 0}
              onChange={handleChange}
              value={0}
              color="default"
              name="radio-button-demo"
              inputProps={{ "aria-label": "ESQUERDA" }}
            />
          }
          label={<LooksOneIcon />}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="bottom"
          control={
            <Radio
              checked={selectedValue === 1}
              onChange={handleChange}
              value={1}
              color="default"
              name="radio-button-demo"
              inputProps={{ "aria-label": "CENTRO" }}
            />
          }
          label={<LooksTwoIcon />}
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="bottom"
          control={
            <Radio
              checked={selectedValue === 2}
              onChange={handleChange}
              value={2}
              color="default"
              name="radio-button-demo"
              inputProps={{ "aria-label": "DIREITA" }}
            />
          }
          label={<Looks3Icon />}
          labelPlacement="bottom"
        />
      </Box>

      <ListProjetos />
    </Container>
  );
};

export default Home;
