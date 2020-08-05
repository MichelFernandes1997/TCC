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
                Não possui cadastro? Então escolha como deseja se cadastrar
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

  /*return (
    <Grid container className={classes.containerHeight}>
      <Grid container style={{ height: "100%" }} spacing={1}>
        <Grid
          item
          xs={6}
          style={{
            height: "100%",
            border: "1px solid white",
            marginTop: "10px",
          }}
        >
          <Grid container style={{ height: "70%" }}>
            <Grid item xs={12} className={classes.gridLogo}>
              <img
                src={Ong}
                alt="Logo da landing page"
                className={(classes.alignBottom, classes.logoOngs)}
              />
            </Grid>
          </Grid>
          <Grid container style={{ height: "30%" }}>
            <Grid item xs={12}>
              <Grid
                container
                style={{
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Não possui cadastro? Então escolha como deseja se cadastrar
                </Typography>
              </Grid>
              <Grid container style={{ height: "80%" }}>
                <Grid item xs={6} className={classes.containerButtons}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.buttons}
                    data-uri="/register/voluntario"
                    onClick={handleSendTo}
                  >
                    Voluntário
                  </Button>
                </Grid>
                <Grid item xs={6} className={classes.containerButtons}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.buttons}
                    data-uri="/register/ong"
                    onClick={handleSendTo}
                  >
                    ONG
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <form
            noValidate
            autoComplete="off"
            style={{
              width: "100%",
              height: "70%",
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
              />
              <Divider variant="middle" />
              <CardContent
                style={{
                  height: "70%",
                }}
              >
                <Grid
                  container
                  style={{
                    height: "100%",
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={2} />
                      <Grid item xs={8}>
                        <TextField
                          id="email"
                          label="Email"
                          helperText=""
                          variant="outlined"
                          className={classes.emailInput}
                        />
                      </Grid>
                      <Grid item xs={2} />
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={2} />
                      <Grid item xs={8}>
                        <TextField
                          id="senha"
                          label="Senha"
                          helperText=""
                          variant="outlined"
                          className={classes.senhaInput}
                        />
                      </Grid>
                      <Grid item xs={2} />
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={3} />
                      <Grid item xs={6}>
                        <Button color="primary" style={{ width: "100%" }}>
                          Esqueci minha senha
                        </Button>
                      </Grid>
                      <Grid item xs={3} />
                    </Grid>
                    <Grid container spacing={4}>
                      <Grid item xs={4} />
                      <Grid item xs={4}>
                        <Button
                          color="primary"
                          variant="contained"
                          style={{ width: "100%", marginTop: "1rem" }}
                        >
                          entrar
                        </Button>
                      </Grid>
                      <Grid item xs={4} />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              ></CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );*/
};

export default Login;
