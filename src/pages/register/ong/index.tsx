import React from "react";

import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Box,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      height: "98vh",
      display: "flex",
      justifyContent: "center",
    },
    fullHeight: {
      height: "100%",
      minHeight: "250px",
      border: "1px solid white",
    },
    fullWidth: {
      width: "99%",
    },
    fullSize: {
      width: "99%",
      height: "100%",
      border: "1px solid red",
    },
    formSizes: {
      width: "99%",
    },
    fieldsSpacing: {
      marginLeft: theme.spacing(2),
    },
    flexGridContainer: {
      display: "flex",
      alignItems: "center",
    },
    formStyles: {
      width: "95%",
      height: "65%",
      marginLeft: "1.7rem",
      border: "2px solid red",
    },
  })
);

const Ong: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <form noValidate autoComplete="off" style={{ height: "60%" }}>
        <Card style={{ height: "100%" }}>
          <CardHeader
            title={
              <Typography variant="h4" color="primary" align="center">
                Cadastro Ong
              </Typography>
            }
          />
          <Divider variant="middle" />
          <CardContent
            style={{
              height: "100%",
            }}
          >
            <Box display="flex" alignItems="center" style={{ height: "80%" }}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    id="nome"
                    label="Nome"
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="data"
                    label="Data de criação"
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cnpj"
                    label="CNPJ"
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={4}>
                  <TextField
                    id="email"
                    label="E-mail"
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="senha"
                    label="senha"
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="confirmaSenha"
                    label="Confirme a senha"
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{
                      width: "100%",
                    }}
                  >
                    Cadastrar
                  </Button>
                </Grid>
                <Grid item xs={4} />
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default Ong;
