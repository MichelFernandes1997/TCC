import React, { useMemo, useState } from "react";

import {
  createMuiTheme,
  ThemeProvider,
  // useMediaQuery,
  CssBaseline,
} from "@material-ui/core";

import Rotas from "./routes";

function App() {
  const [preferTheme, setPreferTheme] = useState<"light" | "dark" | undefined>(
    "dark"
  );

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: preferTheme,
        },
      }),
    [preferTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Rotas />
    </ThemeProvider>
  );
}

export default App;
