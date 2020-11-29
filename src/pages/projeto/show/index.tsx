import React, { useState, useEffect, useContext, useRef, useCallback } from "react";

import { useParams } from "react-router";

import {
  Card,
  Grid,
  Button,
  CardMedia,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";

import Skeleton from "@material-ui/lab/Skeleton";

import "date-fns";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DefaultPhotoCarousel from "../../../assets/images/default.png";

import AuthContext from "../../../contexts/auth";
import { Alert, AlertTitle } from "@material-ui/lab";

interface OngProjeto {
  id: number;
  nome: string;
}

interface VoluntarioProjeto {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  endereco: string;
  updated_at: string;
  created_at: string;
  deleted_at: string;
  ong: OngProjeto | null;
  voluntarios: Array<VoluntarioProjeto | undefined>;
}

const ProjetosSHow: React.FC = () => {
  const newLocal = useParams();
  
  const { id } = newLocal as {id: number};

  const { ShowProjeto, UpdateProjeto, user } = useContext(AuthContext);

  const nomeNotChange = useRef<boolean>(true);

  const descricaoNotChange = useRef<boolean>(true);

  const dataInicioNotChange = useRef<boolean>(true);

  const dataTerminoNotChange = useRef<boolean>(true);

  const enderecoNotChange = useRef<boolean>(true);

  const [projeto, setProjeto] = useState<Projeto | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [disabledNome, setDisabledNome] = useState<boolean>(true);

  const [disabledDescricao, setDisabledDescricao] = useState<boolean>(true);

  const [disabledDataInicio, setDisabledDataInicio] = useState<boolean>(true);

  const [disabledDataTermino, setDisabledDataTermino] = useState<boolean>(true);

  const [disabledEndereco, setDisabledEndereco] = useState<boolean>(true);

  const [nome, setNome] = useState<string | null>(null);

  const [infoNome, setInfoNome] = useState<string | null>(null);

  const [descricao, setDescricao] = useState<string | null>(null);

  const [infoDescricao, setInfoDescricao] = useState<string | null>(null);

  const [endereco, setEndereco] = useState<string | null>(null);

  const [infoEndereco, setInfoEndereco] = useState<string | null>(null);

  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const [infoDataInicio, setInfoDataInicio] = useState<string | null>(null);

  const [dataTermino, setDataTermino] = useState<Date | null>(null);

  const [infoDataTermino, setInfoDataTermino] = useState<string | null>(null);

  const [loadingNome, setLoadingNome] = useState<boolean>(false);

  const [loadingDescricao, setLoadingDescricao] = useState<boolean>(false);

  const [loadingDataInicio, setLoadingDataInicio] = useState<boolean>(false);

  const [loadingDataTermino, setLoadingDataTermino] = useState<boolean>(false);

  const [loadingEndereco, setLoadingEndereco] = useState<boolean>(false);

  const [loadingVoluntariar, setLoadingVoluntariar] = useState<boolean>(false);

  const [notificacao, setNotificacao] = useState<string | null>(null);

  const [checaVoluntario, setChecaVoluntario] = useState<boolean>(false);

  const handleChangeDisableNome = () => {
    setDisabledNome((prev) => !prev);
  };

  const handleChangeDisableDescricao = () => {
    setDisabledDescricao((prev) => !prev);
  };

  const handleChangeDisableDataInicio = () => {
    if (infoDataInicio !== null) {
      setInfoDataInicio(null);
    }

    setDisabledDataInicio((prev) => !prev);
  };

  const handleChangeDisableDataTermino = () => {
    if (infoDataTermino !== null) {
      setInfoDataTermino(null);
    }

    setDisabledDataTermino((prev) => !prev);
  };

  const handleChangeNome = (value: string) => {
    if (nomeNotChange.current) {
      nomeNotChange.current = false;
    }

    if (infoNome !== null) {
      setInfoNome(null);
    }

    setNome(value);
  };

  const handleChangeDescricao = (value: string) => {
    if (descricaoNotChange.current) {
      descricaoNotChange.current = false;
    }

    if (infoDescricao !== null) {
      setInfoDescricao(null);
    }

    setDescricao(value);
  };

  const handleChangeEndereco = (value: string) => {
    if (enderecoNotChange.current) {
      enderecoNotChange.current = false;
    }

    if (infoDescricao !== null) {
      setInfoDescricao(null);
    }

    setEndereco(value);
  };

  const handleChangeDataInicio = (date: Date | null) => {
    if (dataTermino && date) {
      if (date <= dataTermino) {
        if (infoDataInicio !== null) {
          setInfoDataInicio(null);
        }

        if (dataInicioNotChange.current) {
          dataInicioNotChange.current = false;
        }

        setDataInicio(date);
      } else {
        setInfoDataInicio(
          "A data de início não pode ser maior que a data de término"
        );
      }
    } else {
      setDataInicio(null);

      dataInicioNotChange.current = false;
    }
  };

  const handleChangeDataTermino = (date: Date | null) => {
    if (dataInicio && date) {
      if (date > dataInicio) {
        if (infoDataTermino !== null) {
          setInfoDataTermino(null);
        }

        if (dataTerminoNotChange.current) {
          dataTerminoNotChange.current = false;
        }

        setDataTermino(date);
      } else {
        setInfoDataTermino(
          "A data de término não pode ser menor que a data de início"
        );
      }
    } else {
      setDataTermino(null);

      dataTerminoNotChange.current = false;
    }
  };

  const handleChangeDisableEndereco = () => {
    setDisabledEndereco((prev) => !prev);
  };

  const handleSendChange = async (input: string) => {
    if (input === "nome") {
      if (!nomeNotChange.current) {
        if (nome !== null && nome !== "") {
          if (projeto !== null) {
            setLoadingNome(true);

            const response = await UpdateProjeto(projeto.id, { nome });

            if (response) {
              setLoadingNome(false);

              setNotificacao(
                `${input[0].toUpperCase()}${input.slice(
                  1
                )} alterado com successo!`
              );
            }
          }

          setDisabledNome((prev) => !prev);
        } else {
          setInfoNome("O campo possui valor obrigatório!");
        }
      }
    } else if (input === "descricao") {
      if (!descricaoNotChange.current) {
        if (descricao !== null && descricao !== "") {
          if (projeto !== null) {
            setLoadingDescricao(true);

            const response = await UpdateProjeto(projeto.id, { descricao });

            if (response) {
              setLoadingDescricao(false);

              setNotificacao(
                `${input[0].toUpperCase()}${input.slice(
                  1
                )} alterada com successo!`
              );
            }
          }

          setDisabledDescricao((prev) => !prev);
        } else {
          setInfoDescricao("O campo possui valor obrigatório!");
        }
      }
    } else if (input === "dataInicio") {
      if (!dataInicioNotChange.current) {
        if (dataInicio) {
          if (projeto !== null) {
            setLoadingDataInicio(true);

            const response = await UpdateProjeto(projeto.id, { dataInicio });

            if (response) {
              setLoadingDataInicio(false);

              setNotificacao("Data de início alterada com successo!");
            }
          }

          setDisabledDataInicio((prev) => !prev);
        } else {
          setInfoDataInicio("O campo possui valor obrigatório!");
        }
      }
    } else if (input === "dataTermino") {
      if (!dataTerminoNotChange.current) {
        if (dataTermino) {
          if (projeto !== null) {
            setLoadingDataTermino(true);

            const response = await UpdateProjeto(projeto.id, { dataTermino });

            if (response) {
              setLoadingDataTermino(false);

              setNotificacao("Data de término alterada com successo!");
            }
          }

          setDisabledDataTermino((prev) => !prev);
        } else {
          setInfoDataTermino("O campo possui valor obrigatório!");
        }
      }
    } else if (input === "voluntario_id") {
      if (user !== null && "cpf" in user && projeto) {
        setLoadingVoluntariar(true);

        const response = await UpdateProjeto(projeto.id, { voluntario_id: user.id });

        if (response !== false) {
          setLoadingVoluntariar(false);

          setProjeto(response);

          setNotificacao("Agora você é um voluntario desse projeto!");
        }
      }
    } else if (input === "detach_voluntario_id") {
      if (user !== null && "cpf" in user && projeto) {
        setLoadingVoluntariar(true);

        const response = await UpdateProjeto(projeto.id, { detach_voluntario_id: user.id });

        if (response !== false) {
          setLoadingVoluntariar(false);

          setProjeto(response);

          setNotificacao("Agora você não é mais um voluntario desse projeto!");
        }
      }
    } else {
      if (!enderecoNotChange.current) {
        if (endereco !== null && endereco !== "") {
          if (projeto !== null) {
            setLoadingEndereco(true);

            const response = await UpdateProjeto(projeto.id, { endereco });

            if (response) {
              setLoadingEndereco(false);

              setNotificacao(
                `${input[0].toUpperCase()}${input.slice(
                  1
                )} alterado com successo!`
              );
            }
          }

          setDisabledEndereco((prev) => !prev);
        } else {
          setInfoEndereco("O campo possui valor obrigatório!");
        }
      }
    }
  };

  const handleChecarVoluntario = useCallback((projeto): boolean => {
    let returned = false;
    
    if (projeto?.voluntarios[0] !== undefined) {
      projeto?.voluntarios.map((voluntario: any) => {
        if (voluntario?.id === user?.id) {
          returned = true;
        }
      });
    }
    
    return returned;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchProjetos() {
      const response = await ShowProjeto(id);

      if (response !== false) {
        setProjeto(response);
      }
    }

    fetchProjetos();
  }, [ShowProjeto, id]);

  useEffect(() => {
    if (projeto) {
      setChecaVoluntario(handleChecarVoluntario(projeto));

      setLoading(false);

      let dateInicio = new Date(projeto.dataInicio);

      let dateTermino = new Date(projeto.dataTermino);

      setDataInicio(dateInicio);

      setDataTermino(dateTermino);
    } else {
      setLoading(true);
    }
  }, [handleChecarVoluntario, projeto]);

  if (loading) {
    return (
      <Grid
        container
        spacing={2}
        style={{
          marginTop: "0px",
          marginLeft: "0px",
          width: "100vw",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={6} style={{ height: "500px" }}>
          <Card style={{ padding: "10px", height: "100%" }}>
            <Skeleton variant="rect" height="100%" width="100%" />
          </Card>
        </Grid>
        <Grid item xs={6} style={{ height: "500px" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography component="p" variant="h2">
                    <Skeleton />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: "60%", width: "80%" }}
                  >
                    <Skeleton width="100%" height="100%" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography component="p" variant="h2">
                    <Skeleton />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: "60%", width: "80%" }}
                  >
                    <Skeleton width="100%" height="100%" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography component="p" variant="h2">
                    <Skeleton />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: "60%", width: "80%" }}
                  >
                    <Skeleton width="100%" height="100%" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography component="p" variant="h2">
                    <Skeleton />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: "60%", width: "80%" }}
                  >
                    <Skeleton width="100%" height="100%" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography component="p" variant="h2">
                    <Skeleton />
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ height: "60%", width: "80%" }}
                  >
                    <Skeleton width="100%" height="100%" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        spacing={2}
        style={{
          marginTop: "0px",
          marginLeft: "0px",
          width: "100vw",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={6}>
          <Card style={{ padding: "10px" }}>
            <CardMedia
              component="img"
              alt="Imagem do projeto"
              height="500"
              width="400"
              image={DefaultPhotoCarousel}
              title="Imagem do projeto"
            />
          </Card>
        </Grid>
        <Grid item xs={6} style={{ height: "500px" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={projeto?.ong?.id === user?.id ? 10 : 12}>
                  <TextField
                    disabled={disabledNome}
                    label="Nome"
                    defaultValue={projeto?.nome}
                    value={nome}
                    onChange={(e) => handleChangeNome(e.target.value)}
                    style={{ width: "100%" }}
                    variant="outlined"
                    onBlur={() => {
                      if (nomeNotChange.current) {
                        setDisabledNome((prev) => !prev);
                      }
                    }}
                    InputProps={
                      projeto?.ong?.id === user?.id
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="enviar"
                                  size="small"
                                  disabled={disabledNome}
                                  onClick={() => handleSendChange("nome")}
                                  edge="end"
                                >
                                  <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        : {}
                    }
                  />
                  <Typography variant="subtitle2" color="error">
                    {infoNome}
                  </Typography>
                </Grid>
                {projeto?.ong?.id === user?.id ? (
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {loadingNome ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Button
                        variant={disabledNome ? "outlined" : "contained"}
                        color="primary"
                        style={{ height: "100%" }}
                        onClick={handleChangeDisableNome}
                      >
                        Editar
                      </Button>
                    )}
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={projeto?.ong?.id === user?.id ? 10 : 12}>
                  <TextField
                    disabled={disabledDescricao}
                    label="Descricao"
                    multiline
                    defaultValue={projeto?.descricao}
                    value={descricao}
                    onChange={(e) => handleChangeDescricao(e.target.value)}
                    style={{ width: "100%" }}
                    variant="outlined"
                    onBlur={() => {
                      if (descricaoNotChange.current) {
                        setDisabledDescricao((prev) => !prev);
                      }
                    }}
                    InputProps={
                      projeto?.ong?.id === user?.id
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="enviar"
                                  size="small"
                                  disabled={disabledDescricao}
                                  onClick={() => handleSendChange("descricao")}
                                  edge="end"
                                >
                                  <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        : {}
                    }
                  />
                  <Typography variant="subtitle2" color="error">
                    {infoDescricao}
                  </Typography>
                </Grid>
                {projeto?.ong?.id === user?.id ? (
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {loadingDescricao ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Button
                        variant={disabledDescricao ? "outlined" : "contained"}
                        color="primary"
                        style={{ height: "100%" }}
                        onClick={handleChangeDisableDescricao}
                      >
                        Editar
                      </Button>
                    )}
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={projeto?.ong?.id === user?.id ? 10 : 12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="dataInicio"
                      label="Data de início"
                      inputVariant="outlined"
                      invalidDateMessage="Formato de data inválido"
                      format="dd/MM/yyyy"
                      disabled={disabledDataInicio}
                      value={dataInicio}
                      onChange={handleChangeDataInicio}
                      onBlur={() => {
                        if (dataInicioNotChange.current) {
                          setDisabledDataInicio((prev) => !prev);
                        }
                      }}
                      style={{
                        width: "100%",
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputProps={
                        projeto?.ong?.id === user?.id
                          ? {
                              endAdornment: (
                                <IconButton
                                  disabled={disabledDataInicio}
                                  onClick={() => handleSendChange("dataInicio")}
                                  edge="end"
                                >
                                  <SendIcon />
                                </IconButton>
                              ),
                            }
                          : {}
                      }
                      InputAdornmentProps={{ position: "start" }}
                    />
                    <Typography variant="subtitle2" color="error">
                      {infoDataInicio}
                    </Typography>
                  </MuiPickersUtilsProvider>
                </Grid>
                {projeto?.ong?.id === user?.id ? (
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {loadingDataInicio ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Button
                        variant={disabledDataInicio ? "outlined" : "contained"}
                        color="primary"
                        style={{ height: "100%" }}
                        onClick={handleChangeDisableDataInicio}
                      >
                        Editar
                      </Button>
                    )}
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={projeto?.ong?.id === user?.id ? 10 : 12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="dataTermino"
                      label="Data de término"
                      inputVariant="outlined"
                      invalidDateMessage="Formato de data inválido"
                      format="dd/MM/yyyy"
                      disabled={disabledDataTermino}
                      value={dataTermino}
                      onChange={handleChangeDataTermino}
                      onBlur={() => {
                        if (dataTerminoNotChange.current) {
                          setDisabledDataTermino((prev) => !prev);
                        }
                      }}
                      style={{
                        width: "100%",
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputProps={
                        projeto?.ong?.id === user?.id
                          ? {
                              endAdornment: (
                                <IconButton
                                  disabled={disabledDataTermino}
                                  onClick={() =>
                                    handleSendChange("dataTermino")
                                  }
                                  edge="end"
                                >
                                  <SendIcon />
                                </IconButton>
                              ),
                            }
                          : {}
                      }
                      InputAdornmentProps={{ position: "start" }}
                    />
                    <Typography variant="subtitle2" color="error">
                      {infoDataTermino}
                    </Typography>
                  </MuiPickersUtilsProvider>
                </Grid>
                {projeto?.ong?.id === user?.id ? (
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {loadingDataTermino ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Button
                        variant={disabledDataTermino ? "outlined" : "contained"}
                        color="primary"
                        style={{ height: "100%" }}
                        onClick={handleChangeDisableDataTermino}
                      >
                        Editar
                      </Button>
                    )}
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={projeto?.ong?.id === user?.id ? 10 : 12}>
                  <TextField
                    disabled={disabledEndereco}
                    label="Endereco"
                    defaultValue={projeto?.endereco}
                    value={endereco}
                    onChange={(e) => handleChangeEndereco(e.target.value)}
                    style={{ width: "100%" }}
                    variant="outlined"
                    onBlur={() => {
                      if (enderecoNotChange.current) {
                        setDisabledEndereco((prev) => !prev);
                      }
                    }}
                    InputProps={
                      projeto?.ong?.id === user?.id
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="enviar"
                                  size="small"
                                  disabled={disabledEndereco}
                                  onClick={() => handleSendChange("endereco")}
                                  edge="end"
                                >
                                  <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        : {}
                    }
                  />
                  <Typography variant="subtitle2" color="error">
                    {infoEndereco}
                  </Typography>
                </Grid>
                {projeto?.ong?.id === user?.id ? (
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {loadingEndereco ? (
                      <div>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Button
                        variant={disabledEndereco ? "outlined" : "contained"}
                        color="primary"
                        style={{ height: "100%" }}
                        onClick={handleChangeDisableEndereco}
                      >
                        Editar
                      </Button>
                    )}
                  </Grid>
                ) : (
                  ""
                )}
                {user && 'cpf' in user ? (
                  <Grid item xs={12} style={{ textAlign: "center", height: "70px" }}>
                    <Button
                      key={`voluntario${user.id}`}
                      variant="contained"
                      color="primary"
                      style={loadingVoluntariar ? { height: "100%", backgroundColor: "transparent" } : { height: "100%" }}
                      onClick={!checaVoluntario ? () => handleSendChange("voluntario_id") : () => handleSendChange("detach_voluntario_id")}
                    >
                      {loadingVoluntariar 
                        ? 
                          <CircularProgress /> 
                        : 
                          checaVoluntario 
                            ? 
                              "Desvoluntariar-se"
                            : 
                              "Voluntariar-se"}
                    </Button>
                  </Grid>
                ) : (
                  null
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={notificacao !== null}
          autoHideDuration={6000}
          onClose={() => setNotificacao(null)}
        >
          <Alert onClose={() => setNotificacao(null)} severity="success">
            <AlertTitle>Success</AlertTitle>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {notificacao}
          </Alert>
        </Snackbar>
      </Grid>
    );
  }
};

export default ProjetosSHow;
