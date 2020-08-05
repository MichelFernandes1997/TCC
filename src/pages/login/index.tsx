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
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Ong from "../../assets/images/logo.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerButtons: {
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
    gridLogo: {
      display: "flex",
      alignItems: "flex-end",
      height: "99%",
      width: "99%",
    },
    logoOngs: {
      width: "99%",
      height: "80%",
      marginLeft: "5px",
    },
    containerHeight: {
      height: "99vh",
      width: "99vw",
    },
    emailInput: {
      width: "100%",
    },
    senhaInput: {
      width: "100%",
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
  );
};

export default Login;
