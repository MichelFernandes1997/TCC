import React, { useState, useEffect, useContext } from "react";

import AuthContext from "../../contexts/auth";

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
      height: "100vh",
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

  const { Logar } = useContext(AuthContext);

  const history = useHistory();

  const [email, setEmail] = useState<string>("");

  const [senha, setSenha] = useState<string>("");

  const [infoEmail, setInfoEmail] = useState<string>("");

  const handleValidityEmail = () => {
    const regexValidityEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!regexValidityEmail.test(email)) {
      setInfoEmail("O email digitado não possui um formato válido");
    } else {
      setInfoEmail("");
    }
  };

  const handleChangeEmail = (input: string) => {
    setEmail(input);
  };

  const handleChangeSenha = (input: string) => {
    setSenha(input);
  };

  const handleSendTo = (event: React.MouseEvent<HTMLElement>) => {
    history.push(event.currentTarget.dataset.uri as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Logar({ username: email, password: senha });
  };

  useEffect(() => {
    if (email !== "") {
      handleValidityEmail();
    }
  }, [email]);

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid item xs={6}>
          <Grid
            container
            spacing={1}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container>
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
                  style={{ width: "95%", maxWidth: "450px" }}
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
                  style={{ width: "95%", maxWidth: "450px" }}
                  data-uri="/register/ong"
                  onClick={handleSendTo}
                >
                  ONG
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ height: "100%" }}>
          <Grid
            container
            spacing={1}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12}>
              <form
                noValidate
                autoComplete="off"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "420px",
                  maxHeight: "620px",
                }}
                onSubmit={handleSubmit}
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
                  <CardContent>
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
                            value={email}
                            helperText={
                              <Typography variant="subtitle2" color="error">
                                {infoEmail}
                              </Typography>
                            }
                            variant="outlined"
                            className={classes.emailInput}
                            onChange={(e) => handleChangeEmail(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.align}>
                          <TextField
                            id="senha"
                            label="Senha"
                            type="password"
                            value={senha}
                            helperText="Lembre-se que a senha deve ter no mínimo uma letra maiúscula, uma minúscula, um número, um caractere especial e no mínimo 8 caracteres"
                            variant="outlined"
                            className={classes.senhaInput}
                            onChange={(e) => handleChangeSenha(e.target.value)}
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
                            type="submit"
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
