import React, { useState } from "react";

import { Radio, Box, FormControlLabel } from "@material-ui/core";

import CarouselSlide from "../../components/Carrousel";

const Home: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(parseInt(event.target.value));
  };

  return (
    <>
      <CarouselSlide
        content={[
          { title: "Slide 1" },
          { title: "Slide 2" },
          { title: "Slide 3" },
        ]}
        carouselSelected={selectedValue}
      />

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
          label="1"
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
          label="2"
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
          label="3"
          labelPlacement="bottom"
        />
      </Box>
    </>
  );
};

export default Home;
