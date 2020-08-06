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
  CardActions,
  Divider,
  Box,
  Paper,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Ong from "../../assets/images/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    /*containerButtons: {
      display: "flex",
      justifyContent: "center",
      alignItems: "self-start",
    },
    buttons: {
      width: "80%",
      height: "30%",
    },
    alignBottom: {
      display: "flex",
      justifyContent: "end",
    },
    containerHeight: {
      height: "99vh",
      width: "99vw",
    },*/
    formContainer: {
      height: "98vh",
      minHeight: "900px",
      display: "flex",
      justifyContent: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    align: {
      textAlign: "center",
    },
    logoOngs: {
      width: "100%",
      maxHeight: "750px",
    },
    emailInput: {
      width: "60%",
    },
    senhaInput: {
      width: "60%",
    },
  })
);

const Login: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleSendTo = (event: React.MouseEvent<HTMLElement>) => {
    history.push(event.currentTarget.dataset.uri as string);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.align}>
              <img
                src={Ong}
                alt="Logo da landing page"
                className={classes.logoOngs}
              />
            </Grid>
            <Grid item xs={12} className={classes.align}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Não possui cadastro no UniOng? Então escolha uma das formas de
                cadastro
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.align}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "70%" }}
                data-uri="/register/voluntario"
                onClick={handleSendTo}
              >
                Voluntário
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.align}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "70%" }}
                data-uri="/register/ong"
                onClick={handleSendTo}
              >
                ONG
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1} style={{ height: "100%" }}>
            <Grid item xs={12}>
              <form
                noValidate
                autoComplete="off"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Card
                  style={{
                    height: "100%",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h3" color="primary" align="center">
                        Login
                      </Typography>
                    }
                    style={{
                      marginTop: "20px",
                    }}
                  />
                  <Divider />
                  <CardContent
                    style={{
                      height: "83.9%",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      style={{ height: "90%" }}
                    >
                      <Grid container spacing={2} className={classes.align}>
                        <Grid item xs={12}>
                          <TextField
                            id="email"
                            label="Email"
                            helperText=""
                            variant="outlined"
                            className={classes.emailInput}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.align}>
                          <TextField
                            id="senha"
                            label="Senha"
                            helperText=""
                            variant="outlined"
                            className={classes.senhaInput}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.align}>
                          <Button color="primary" style={{ width: "100%" }}>
                            Esqueci minha senha
                          </Button>
                        </Grid>
                        <Grid item xs={12} className={classes.align}>
                          <Button
                            color="primary"
                            variant="contained"
                            style={{
                              width: "80%",
                              maxWidth: "400px",
                              marginTop: "1rem",
                            }}
                          >
                            entrar
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
