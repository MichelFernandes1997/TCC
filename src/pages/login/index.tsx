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

interface InfoSenha {
  error: string | null;
  errorSpecialsChars: string;
  errorUpperCase: string;
  errorLowerCase: string;
  errorNumbers: string;
  errorMinimumCaracteres: string;
}

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

  const [email, setEmail] = useState<string | null>("");

  const [senha, setSenha] = useState<string | null>("");

  const [infoEmail, setInfoEmail] = useState<string | null>(null);

  const [infoSenha, setInfoSenha] = useState<InfoSenha | null>(null);

  const handleValidityEmail = () => {
    if (email !== null) {
      const regexValidityEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!regexValidityEmail.test(email)) {
        setInfoEmail("O email digitado não possui um formato válido");
      } else {
        setInfoEmail("");
      }
    } else {
      setInfoEmail(null);
    }
  };

  const handleValiditySenha = () => {
    if (senha !== null) {
      let validitySpecialChars = /^(?=.*[@!#$%^&*()/\\])/; // /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;

      let validityNumbers = /^(?=.*[0-9])/;

      let validityUpperCase = /^(?=.*[A-Z])/;

      let validityLowerCase = /^(?=.*[a-z])/;

      let validityMinimumCaracteres = /^[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;

      if (infoSenha !== null) {
        if (!validitySpecialChars.test(senha)) {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                error: null,
                errorSpecialsChars:
                  "* É necessário pelo menos um caractere especial",
              } as InfoSenha | null)
          );
        } else {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorSpecialsChars: "",
              } as InfoSenha | null)
          );
        }

        if (!validityNumbers.test(senha)) {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorNumbers: "* É necessário pelo menos um número",
              } as InfoSenha | null)
          );
        } else {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorNumbers: "",
              } as InfoSenha | null)
          );
        }

        if (!validityUpperCase.test(senha)) {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorUpperCase: "* É necessário pelo menos uma letra maiúscula",
              } as InfoSenha | null)
          );
        } else {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorUpperCase: "",
              } as InfoSenha | null)
          );
        }

        if (!validityLowerCase.test(senha)) {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorLowerCase: "* É necessário pelo menos uma letra minúscula",
              } as InfoSenha | null)
          );
        } else {
          setInfoSenha(
            (prevState) =>
              ({
                ...prevState,
                errorLowerCase: "",
              } as InfoSenha | null)
          );
        }
      }

      if (!validityMinimumCaracteres.test(senha)) {
        setInfoSenha(
          (prevState) =>
            ({
              ...prevState,
              errorMinimumCaracteres: "* É necessário no mínimo 8 caracteres",
            } as InfoSenha | null)
        );
      } else {
        setInfoSenha(
          (prevState) =>
            ({
              ...prevState,
              errorMinimumCaracteres: "",
            } as InfoSenha | null)
        );
      }
    } else {
      setInfoSenha(null);
    }
  };

  const handleChangeSenha = (input: string) => {
    if (input !== "") {
      setSenha(input);
    } else {
      setSenha(null);
    }
  };

  const handleChangeEmail = (input: string) => {
    if (input !== "") {
      setEmail(input);
    } else {
      setEmail(null);
    }
  };

  const handleSendTo = (event: React.MouseEvent<HTMLElement>) => {
    history.push(event.currentTarget.dataset.uri as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var formInvalido = false as boolean;

    if (email === "") {
      formInvalido = true;

      setInfoEmail("Campo obrigatório");
    }

    if (infoSenha === null) {
      formInvalido = true;

      setInfoSenha({
        error: "Campo obrigatório",
        errorSpecialsChars: "",
        errorUpperCase: "",
        errorLowerCase: "",
        errorNumbers: "",
        errorMinimumCaracteres: "",
      });
    }
    
    if (!formInvalido) {
      Logar({ username: email, password: senha });
    }
  };

  useEffect(() => {
    if (email !== "") {
      handleValidityEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (senha !== "") {
      handleValiditySenha();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senha]);

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
            <Grid container style={{height: "100%"}}>
              <Grid item xs={12} className={classes.align} style={{height: "80%"}}>
                <img
                  src={Ong}
                  alt="Logo da landing page"
                  className={classes.logoOngs}
                  style={{ height: "100%" }}
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
                            helperText={
                              infoSenha !== null ? (
                                infoSenha.error === "Campo obrigatório" ? (
                                  <Typography variant="subtitle2" color="error">
                                    {infoSenha.error}
                                  </Typography>
                                ) : (
                                  <Typography variant="subtitle2" color="error">
                                    {infoSenha.errorSpecialsChars !== "" &&
                                    (infoSenha.errorNumbers !== "" ||
                                      infoSenha.errorUpperCase !== "" ||
                                      infoSenha.errorLowerCase !== "" ||
                                      infoSenha.errorMinimumCaracteres !== "") ? (
                                      <p>{infoSenha.errorSpecialsChars}</p>
                                    ) : (
                                      infoSenha.errorSpecialsChars
                                    )}
                                    {infoSenha.errorNumbers !== "" &&
                                    (infoSenha.errorSpecialsChars !== "" ||
                                      infoSenha.errorUpperCase !== "" ||
                                      infoSenha.errorLowerCase !== "" ||
                                      infoSenha.errorMinimumCaracteres !== "") ? (
                                      <p>{infoSenha.errorNumbers}</p>
                                    ) : (
                                      infoSenha.errorNumbers
                                    )}
                                    {infoSenha.errorUpperCase !== "" &&
                                    (infoSenha.errorSpecialsChars !== "" ||
                                      infoSenha.errorNumbers !== "" ||
                                      infoSenha.errorLowerCase !== "" ||
                                      infoSenha.errorMinimumCaracteres !== "") ? (
                                      <p>{infoSenha.errorUpperCase}</p>
                                    ) : (
                                      infoSenha.errorUpperCase
                                    )}
                                    {infoSenha.errorLowerCase !== "" &&
                                    (infoSenha.errorUpperCase !== "" ||
                                      infoSenha.errorNumbers !== "" ||
                                      infoSenha.errorSpecialsChars !== "" ||
                                      infoSenha.errorMinimumCaracteres !== "") ? (
                                      <p>{infoSenha.errorLowerCase}</p>
                                    ) : (
                                      infoSenha.errorLowerCase
                                    )}
                                    {infoSenha.errorMinimumCaracteres !== "" &&
                                    (infoSenha.errorUpperCase !== "" ||
                                      infoSenha.errorNumbers !== "" ||
                                      infoSenha.errorSpecialsChars !== "" ||
                                      infoSenha.errorLowerCase !== "") ? (
                                      <p>{infoSenha.errorMinimumCaracteres}</p>
                                    ) : (
                                      infoSenha.errorMinimumCaracteres
                                    )}
                                  </Typography>
                                )
                              ) : (
                                ""
                              )
                            }
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
