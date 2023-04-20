import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Place = {
  id: number;
  name: string;
  state: string;
  population: number;
};

const cityApi =
  "https://gist.githubusercontent.com/CalamityAdam/914dc118289b4b40f1f2adeacc8c445e/raw/57870057da789cfcbaa59f63b3718ac7e5e69008/cities.json";

const App = () => {
  const [placesRaw, setPlacesRaw] = useState<Place[]>([]);
  const [placesFiltered, setPlacesFiltered] = useState<Place[]>([]);

  useEffect(() => {
    fetch(cityApi)
      .then((res) => res.json())
      .then((data) => {
        setPlacesRaw(data);
        setPlacesFiltered(data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = new RegExp(value, "gi");
    const filtered = placesRaw.filter((place) => {
      return place.name.match(regex) || place.state.match(regex);
    });
    setPlacesFiltered(filtered);
  };

  return (
    <Container>
      <Box display="flex" p={3}>
        <TextField
          id="outlined-basic"
          label="City/State"
          variant="outlined"
          sx={{ mx: "auto" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </Box>

      {placesFiltered.map((place) => (
        <Accordion key={place.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{place.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {`${place.name}, ${place.state} - has population of ${place.population}`}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default App;
