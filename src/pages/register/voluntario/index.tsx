import React, { useState, useEffect } from "react";

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

  const [nomeCompleto, setNomeCompleto] = useState<string>("");

  const [data, setData] = useState<Date | null>(null);

  const [cpf, setCpf] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [senha, setSenha] = useState<string>("");

  const [infoSenha, setInfoSenha] = useState<{
    error: string | null;
    errorSpecialsChars: string;
    errorUpperCase: string;
    errorLowerCase: string;
    errorNumbers: string;
    errorMinimumCaracteres: string;
  }>({
    error: "",
    errorSpecialsChars: "",
    errorUpperCase: "",
    errorLowerCase: "",
    errorNumbers: "",
    errorMinimumCaracteres: "",
  });

  const [infoConfirmaSenha, setInfoConfirmaSenha] = useState<string>("");

  const [infoCpf, setInfoCpf] = useState<string>("");

  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [infoEmail, setInfoEmail] = useState<string>("");

  const handleChangeNomeCompleto = (input: string) => {
    setNomeCompleto(input);
  };

  const handleChangeData = (date: Date | null) => {
    setData(date);
  };

  const handleValidityCpf = () => {
    const regexValidityCpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;

    if (!regexValidityCpf.test(cpf)) {
      setInfoCpf("O cpf digitado está incorreto");
    } else {
      setInfoCpf("");
    }
  };

  const handleChangeCpf = (input: string) => {
    var maskCpf = input.substring(0, 18);

    maskCpf = maskCpf.replace(/\D/g, "");
    maskCpf = maskCpf.replace(/(\d{3})(\d)/, "$1.$2");
    maskCpf = maskCpf.replace(/(\d{3})(\d)/, "$1.$2");
    maskCpf = maskCpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(maskCpf);
  };

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

  const handleValiditySenha = () => {
    let validitySpecialChars = /^(?=.*[@!#$%^&*()/\\])/; // /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;

    let validityNumbers = /^(?=.*[0-9])/;

    let validityUpperCase = /^(?=.*[A-Z])/;

    let validityLowerCase = /^(?=.*[a-z])/;

    let validityMinimumCaracteres = /^[@!#$%^&*()/\\a-zA-Z0-9]{8,20}$/;

    if (!validitySpecialChars.test(senha)) {
      setInfoSenha((prevState) => ({
        ...prevState,
        error: null,
        errorSpecialsChars: "* É necessário pelo menos um caractere especial",
      }));
    } else {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorSpecialsChars: "",
      }));
    }

    if (!validityNumbers.test(senha)) {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorNumbers: "* É necessário pelo menos um número",
      }));
    } else {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorNumbers: "",
      }));
    }

    if (!validityUpperCase.test(senha)) {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorUpperCase: "* É necessário pelo menos uma letra maiúscula",
      }));
    } else {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorUpperCase: "",
      }));
    }

    if (!validityLowerCase.test(senha)) {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorLowerCase: "* É necessário pelo menos uma letra minúscula",
      }));
    } else {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorLowerCase: "",
      }));
    }

    if (!validityMinimumCaracteres.test(senha)) {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorMinimumCaracteres: "* É necessário no mínimo 8 caracteres",
      }));
    } else {
      setInfoSenha((prevState) => ({
        ...prevState,
        errorMinimumCaracteres: "",
      }));
    }
  };

  const handleChangeSenha = (input: string) => {
    setSenha(input);
  };

  const handleValidityConfirmaSenha = () => {
    if (confirmaSenha !== senha) {
      setInfoConfirmaSenha("As senhas digitadas não são iguais");
    } else {
      setInfoConfirmaSenha("");
    }
  };

  const handleChangeConfirmaSenha = (input: string) => {
    setConfirmaSenha(input);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(data);
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

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      m={1}
      className={classes.formContainer}
    >
      <form
        noValidate
        autoComplete="off"
        style={{ height: "60%" }}
        onSubmit={handleSubmit}
      >
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
                <Grid item xs={6}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      label="Data de nascimento"
                      inputVariant="outlined"
                      invalidDateMessage="Formato de data inválido"
                      format="dd/MM/yyyy"
                      value={data}
                      onChange={handleChangeData}
                      style={{ width: "100%" }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                  <TextField
                    id="senha"
                    label="senha"
                    type="password"
                    value={senha}
                    helperText={
                      infoSenha.error === "" ? (
                        infoSenha.error
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
                    }
                    variant="outlined"
                    className={classes.fullWidth}
                    onChange={(e) => handleChangeSenha(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
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
