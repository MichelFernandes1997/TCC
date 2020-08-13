import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";

import AuthContext from "../../../contexts/auth";

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

import "date-fns";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
      width: "100%",
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

interface VoluntarioInput {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: Date;
  email: string;
  senha: string;
}

interface InfoSenha {
  error: string | null;
  errorSpecialsChars: string;
  errorUpperCase: string;
  errorLowerCase: string;
  errorNumbers: string;
  errorMinimumCaracteres: string;
}

const Voluntario: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const { RegisterVoluntario } = useContext(AuthContext);

  const [nomeCompleto, setNomeCompleto] = useState<string | null>("");

  const [data, setData] = useState<Date | null>(null);

  const [cpf, setCpf] = useState<string | null>("");

  const [email, setEmail] = useState<string | null>("");

  const [senha, setSenha] = useState<string | null>("");

  const [infoSenha, setInfoSenha] = useState<InfoSenha | null>(null);

  const [infoConfirmaSenha, setInfoConfirmaSenha] = useState<string | null>(
    null
  );

  const [infoCpf, setInfoCpf] = useState<string | null>("");

  const [confirmaSenha, setConfirmaSenha] = useState<string | null>("");

  const [infoEmail, setInfoEmail] = useState<string | null>(null);

  const [infoData, setInfoData] = useState<string | null>(null);

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const handleValidityNomeCompleto = (): boolean => {
    if (nomeCompleto === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleChangeNomeCompleto = (input: string) => {
    if (input === "") {
      setNomeCompleto(null);
    } else {
      setNomeCompleto(input);
    }
  };

  const handleChangeData = (date: Date | null) => {
    if (infoData === "Campo obrigatório") {
      setInfoData(null);
    }

    setData(date);
  };

  const handleValidityCpf = () => {
    if (cpf !== null) {
      const regexValidityCpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;

      if (!regexValidityCpf.test(cpf)) {
        setInfoCpf("O cpf digitado está incorreto");
      } else {
        setInfoCpf("");
      }
    } else {
      setInfoCpf(null);
    }
  };

  const handleChangeCpf = (input: string) => {
    if (input !== "") {
      var maskCpf = input.substring(0, 14);

      maskCpf = maskCpf.replace(/\D/g, "");
      maskCpf = maskCpf.replace(/(\d{3})(\d)/, "$1.$2");
      maskCpf = maskCpf.replace(/(\d{3})(\d)/, "$1.$2");
      maskCpf = maskCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      setCpf(maskCpf);
    } else {
      setCpf(null);
    }
  };

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

  const handleChangeEmail = (input: string) => {
    if (input !== "") {
      setEmail(input);
    } else {
      setEmail(null);
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

  const handleValidityConfirmaSenha = () => {
    if (confirmaSenha !== null) {
      if (confirmaSenha !== senha) {
        setInfoConfirmaSenha("As senhas digitadas não são iguais");
      } else {
        setInfoConfirmaSenha("");
      }
    } else {
      setInfoConfirmaSenha(null);
    }
  };

  const handleChangeConfirmaSenha = (input: string) => {
    if (input !== "") {
      setConfirmaSenha(input);
    } else {
      setConfirmaSenha(null);
    }
  };

  const handleSendTo = (uri: string) => {
    history.push(uri);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var infoNomeCompleto = handleValidityNomeCompleto();

    var formInvalido = false as boolean;

    if (infoEmail === null) {
      formInvalido = true;

      setInfoEmail("Campo obrigatório");
    }

    if (infoCpf === null) {
      formInvalido = true;

      setInfoCpf("Campo obrigatório");
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

    if (infoConfirmaSenha === null) {
      formInvalido = true;

      setInfoConfirmaSenha("Campo obrigatório");
    }

    if (!infoNomeCompleto) {
      formInvalido = true;
    }

    if (data === null) {
      formInvalido = true;

      setInfoData("Campo obrigatório");
    }

    if (!formInvalido) {
      const voluntario = {
        nomeCompleto,
        dataNascimento: data,
        cpf,
        email,
        senha,
      } as VoluntarioInput;

      const response = RegisterVoluntario(voluntario);

      if (response) {
        handleSendTo("/");
      }
    }
  };

  useEffect(() => {
    if (email !== "") {
      handleValidityEmail();
    }
  }, [email]);

  useEffect(() => {
    if (cpf !== "") {
      handleValidityCpf();
    }
  }, [cpf]);

  useEffect(() => {
    if (confirmaSenha !== "") {
      handleValidityConfirmaSenha();
    }
  }, [confirmaSenha]);

  useEffect(() => {
    if (senha !== "") {
      handleValiditySenha();
    }
  }, [senha]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card style={{ height: "100%" }}>
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
              height: "100%",
            }}
          >
            <Box display="flex" alignItems="center" style={{ height: "80%" }}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 850 ? 12 : 5) : 5}
                >
                  <TextField
                    id="nomeCompleto"
                    label="Nome Completo"
                    value={nomeCompleto}
                    helperText=""
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeNomeCompleto(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 850 ? 12 : 3) : 3}
                >
                  <TextField
                    id="cpf"
                    label="CPF"
                    value={cpf}
                    helperText={
                      <Typography variant="subtitle2" color="error">
                        {infoCpf}
                      </Typography>
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeCpf(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 850 ? 12 : 4) : 4}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      label="Data de nascimento"
                      inputVariant="outlined"
                      invalidDateMessage="Formato de data inválido"
                      format="dd/MM/yyyy"
                      maxDateMessage="Data de nascimento não pode ser posteior à data do dia de hoje"
                      disableFuture={true}
                      value={data}
                      onChange={handleChangeData}
                      style={{ width: "100%" }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <Typography
                    style={
                      infoData !== "Campo obrigatório"
                        ? { display: "none" }
                        : {}
                    }
                    variant="subtitle2"
                    color="error"
                  >
                    {infoData}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 850 ? 12 : 4) : 4}
                >
                  <TextField
                    id="email"
                    label="E-mail"
                    value={email}
                    helperText={
                      <Typography variant="subtitle2" color="error">
                        {infoEmail}
                      </Typography>
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 850 ? 12 : 4) : 4}
                >
                  <TextField
                    id="senha"
                    label="senha"
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
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeSenha(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={windowWidth !== null ? (windowWidth < 850 ? 12 : 4) : 4}
                >
                  <TextField
                    id="confirmaSenha"
                    label="Confirme a senha"
                    type="password"
                    value={confirmaSenha}
                    helperText={
                      <Typography variant="subtitle2" color="error">
                        {infoConfirmaSenha}
                      </Typography>
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeConfirmaSenha(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
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

export default Voluntario;
