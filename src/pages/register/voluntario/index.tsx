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
      height: "100vh",
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

const Voluntario: React.FC = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader
            title={
              <Typography variant="h4" color="primary" align="center">
                Cadastro Voluntario
              </Typography>
            }
          />
          <Divider variant="middle" />
          <CardContent
            style={{
              height: "70%",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="nome"
                  label="Nome Completo"
                  helperText=""
                  variant="outlined"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="cpf"
                  label="CPF"
                  helperText=""
                  variant="outlined"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="data"
                  label="Data de Nascimento"
                  helperText=""
                  variant="outlined"
                  className={classes.fullWidth}
                />
              </Grid>
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
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default Voluntario;
