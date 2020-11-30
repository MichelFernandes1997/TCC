import React, { useState, useEffect } from "react";

import moment from "moment";

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
  setNotificacao(mensagem: string | null): void;
}

export default function FormProjeto(props: Props) {
  const classes = useStyles();

  const { close, ong_id, setNotificacao } = props;

  const [nome, setNome] = useState<string | null>("");

  const [descricao, setDescricao] = useState<string | null>("");

  const [dataInicio, setDataInicio] = useState<Date | null>(null);

  const [dataTermino, setDataTermino] = useState<Date | null>(null);

  const [endereco, setEndereco] = useState<string | null>("");

  const [infoNome, setInfoNome] = useState<string | null>(null);

  const [infoDescricao, setInfoDescricao] = useState<string | null>(null);

  const [infoDataInicio, setInfoDataInicio] = useState<string | null>(null);

  const [infoDataTermino, setInfoDataTermino] = useState<string | null>(null);

  const [infoEndereco, setInfoEndereco] = useState<string | null>(null);

  const [enviar, setEnviar] = useState<boolean>(false);

  const handleValidityNome = () => {
    if (nome !== null) {
      setInfoNome("");
    }
  };

  const handleChangeNome = (value: string) => {
    if (value === "") {
      setNome(null);
    } else {
      setNome(value);
    }
  };

  const handleValidityDescricao = () => {
    if (descricao !== null) {
      setInfoDescricao("");
    } else {
      setInfoDescricao(null);
    }
  };

  const handleChangeDescricao = (value: string) => {
    if (value === "") {
      setDescricao(null);
    } else {
      setDescricao(value);
    }
  };

  const handleChangeDataInicio = (date: Date | null) => {
    setDataInicio(date);
  };

  const handleValidityDataInicio = () => {
    if (dataInicio !== null) {
      setInfoDataInicio("");
    } else {
      setInfoDataInicio(null);
    }
  }

  const handleValidityDataTermino = (dateInicio: Date, dateTermino: Date) => {
    var inicio = new Date(moment(dateInicio).format("MM/DD/YYYY"));

    var termino = new Date(moment(dateTermino).format("MM/DD/YYYY"));

    var diff = Math.floor(termino.getTime() - inicio.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);
    
    console.log(days, months, years);

    if (days < 0 && months <= 0 && years <= 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleChangeDataTermino = (date: Date | null) => {
    if ((dataInicio && date) && (handleValidityDataTermino(dataInicio, date))) {
      setInfoDataTermino("A data de término não pode ser menor que a data de inicio");
    } else {
      setDataTermino(date);
    }
  };

  const handleValidityEndereco = () => {
    if (endereco !== null) {
      setInfoEndereco("");
    }
  };

  const handleChangeEndereco = (value: string) => {
    if (value === "") {
      setEndereco(null);
    } else {
      setEndereco(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (infoNome === null) {
      setInfoNome("Campo obrigatório");
    }

    if (infoDescricao === null) {
      setInfoDescricao("Campo obrigatório");
    }

    if (dataInicio === null) {
      setInfoDataInicio("Campo obrigatório");
    }

    if (dataTermino === null) {
      setInfoDataTermino("Campo obrigatório");
    }

    if (infoEndereco === null) {
      setInfoEndereco("Campo obrigatório");
    }

    if (nome && descricao && endereco && dataInicio && dataTermino && ong_id && infoDataTermino !== "A data de término não pode ser menor que a data de inicio") {
      setEnviar(true);

      const response = await CreateProjeto({
        nome,
        descricao,
        dataInicio,
        dataTermino,
        endereco,
        ong_id,
      });
      
      if (response) {
        setEnviar(false);

        close();

        setNotificacao("Projeto criado com sucesso!");
      } else {
        setEnviar(false);

        setNotificacao("Houve um erro ao tentar criar o projeto, tente novamente");
      }
    }
  };

  useEffect(() => {
    if (nome !== "") {
      handleValidityNome();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome]);

  useEffect(() => {
    if (descricao !== "") {
      handleValidityDescricao();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descricao]);

  useEffect(() => {
    if (dataInicio !== null) {
      handleValidityDataInicio();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInicio]);

  useEffect(() => {
    if (dataTermino !== null) {
      setInfoDataTermino(null);
    }
  }, [dataTermino]);

  useEffect(() => {
    if (endereco !== "" ) {
      handleValidityEndereco();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            multiline
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
