import React, { useState, useEffect } from "react";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import "date-fns";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import CreateProjeto from "../../../servicos/projetos/create";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

interface Props {
  ong_id: number | undefined;
  close(): void;
}

export default function FormProjeto(props: Props) {
  const classes = useStyles();

  const { close, ong_id } = props;

  const [nome, setNome] = useState<string>("");

  const [descricao, setDescricao] = useState<string>("");

  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const [dataTermino, setDataTermino] = useState<Date | null>(null);

  const [endereco, setEndereco] = useState<string>("");

  const [infoNome, setInfoNome] = useState<string | null>(null);

  const [infoDescricao, setInfoDescricao] = useState<string | null>(null);

  const [infoDataInicio, setInfoDataInicio] = useState<string | null>(null);

  const [infoDataTermino, setInfoDataTermino] = useState<string | null>(null);

  const [infoEndereco, setInfoEndereco] = useState<string | null>(null);

  const [enviar, setEnviar] = useState<boolean>(false);

  const handleChangeNome = (value: string) => {
    setNome(value);
  };

  const handleChangeDescricao = (value: string) => {
    setDescricao(value);
  };

  const handleChangeDataInicio = (date: Date | null) => {
    setDataInicio(date);
  };

  const handleChangeDataTermino = (date: Date | null) => {
    setDataTermino(date);
  };

  const handleChangeEndereco = (value: string) => {
    setEndereco(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nome === "") {
      setInfoNome("Campo obrigatório");
    }

    if (descricao === "") {
      setInfoDescricao("Campo obrigatório");
    }

    if (dataInicio === null) {
      setInfoDataInicio("Campo obrigatório");
    }

    if (dataTermino === null) {
      setInfoDataTermino("Campo obrigatório");
    }

    if (endereco === "") {
      setInfoEndereco("Campo obrigatório");
    }

    if (dataInicio !== null && dataTermino !== null && ong_id !== undefined) {
      const response = await CreateProjeto({
        nome,
        descricao,
        dataInicio,
        dataTermino,
        endereco,
        ong_id,
      });
    }
  };

  useEffect(() => {
    if (nome !== "" && infoNome !== null) {
      setInfoNome(null);
    }
  }, [nome]);

  useEffect(() => {
    if (descricao !== "" && infoDescricao !== null) {
      setInfoDescricao(null);
    }
  }, [descricao]);

  useEffect(() => {
    if (dataInicio !== null && infoDataInicio !== null) {
      setInfoDataInicio(null);
    }
  }, [dataInicio]);

  useEffect(() => {
    if (dataTermino !== null && infoDataTermino !== null) {
      setInfoDataTermino(null);
    }
  }, [dataTermino]);

  useEffect(() => {
    if (endereco !== "" && infoEndereco !== null) {
      setInfoEndereco(null);
    }
  }, [endereco]);

  if (enviar) {
    return (
      <Backdrop className={classes.backdrop} open={enviar}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>Criação de novo projeto</DialogContentText>
          <TextField
            margin="dense"
            id="nome"
            label="Nome"
            helperText={
              <Typography variant="subtitle2" color="error">
                {infoNome}
              </Typography>
            }
            value={nome}
            onChange={(e) => handleChangeNome(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="descricao"
            label="Descrição"
            helperText={
              <Typography variant="subtitle2" color="error">
                {infoDescricao}
              </Typography>
            }
            value={descricao}
            onChange={(e) => handleChangeDescricao(e.target.value)}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="dataInicio"
              label="Data de início"
              margin="dense"
              invalidDateMessage="Formato de data inválido"
              format="dd/MM/yyyy"
              value={dataInicio}
              onChange={handleChangeDataInicio}
              style={{ width: "100%" }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Typography variant="subtitle2" color="error">
              {infoDataInicio}
            </Typography>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="dataTermino"
              label="Data de término"
              margin="dense"
              invalidDateMessage="Formato de data inválido"
              format="dd/MM/yyyy"
              value={dataTermino}
              onChange={handleChangeDataTermino}
              style={{ width: "100%" }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Typography variant="subtitle2" color="error">
              {infoDataTermino}
            </Typography>
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            id="endereco"
            label="Endereço"
            helperText={
              <Typography variant="subtitle2" color="error">
                {infoEndereco}
              </Typography>
            }
            value={endereco}
            onChange={(e) => handleChangeEndereco(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancelar
          </Button>
          <Button color="primary" type="submit">
            Criar
          </Button>
        </DialogActions>
      </form>
    );
  }
}
