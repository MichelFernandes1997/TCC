import React, { useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  Snackbar,
} from "@material-ui/core";

import { Alert, AlertTitle } from "@material-ui/lab";

import ViewListIcon from "@material-ui/icons/ViewList";

import WatchLaterIcon from "@material-ui/icons/WatchLater";

import HourglassFullIcon from "@material-ui/icons/HourglassFull";

import HistoryIcon from "@material-ui/icons/History";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import AddIcon from "@material-ui/icons/Add";

import AuthContext from "../../contexts/auth";

import FormProjeto from "../../pages/projeto/create";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "left";

interface Props {
  open: boolean;
  close(): void;
}

interface Voluntario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  token: string;
}

interface Ong {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  dataCriacao: string;
  descricao: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  token: string;
}

export default function TemporaryDrawer(props: Props) {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const [state, setState] = useState({
    left: props.open,
  });

  const [open, setOpen] = useState<boolean>(false);

  const [notificacao, setNotificacao] = useState<string | null>(null);

  const history = useHistory();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });

    props.close();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendTo = (uri: string | null) => {
    if (uri !== null) {
      history.push(uri);
    }
  };

  useEffect(() => {
    if (props.open === true) {
      setState({ left: true });
    }
  }, [props.open]);

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Listar ONGS", "Projetos passados", "Projetos acontecendo agora"].map(
          (text, index) => (
            <ListItem
              button
              key={text}
              onClick={
                text === "Projetos acontecendo agora"
                  ? () => handleSendTo("/projetos-started")
                  : text === "Projetos passados"
                  ? () => handleSendTo("/projetos-passed")
                  : () => handleSendTo("/ongs-list")
              }
            >
              <ListItemIcon>
                {text === "Projetos acontecendo agora" ? (
                  <HourglassFullIcon />
                ) : text === "Projetos passados" ? (
                  <WatchLaterIcon />
                ) : (
                  <ViewListIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <>
        {user !== null && "cpf" in user ? (
          <List>
            {[
              "Projetos que sou voluntário",
              "Projetos que participei",
              "Meus projetos que irão começar",
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={
                  text === "Meus projetos que irão começar"
                    ? () => handleSendTo("/projetosOfVoluntario-startTo")
                    : text === "Projetos que participei"
                    ? () => handleSendTo("/projetosOfVoluntario-passed")
                    : () => handleSendTo("/projetosOfVoluntario-list")
                }
              >
                <ListItemIcon>
                  {text === "Meus projetos que irão começar" ? (
                    <HourglassEmptyIcon />
                  ) : text === "Projetos que participei" ? (
                    <HistoryIcon />
                  ) : (
                    <FormatListBulletedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {[
              "Meus projetos",
              "Novo projeto",
              "Meus projetos que irão começar",
            ].map((text, index) => (
              <>
                {text !== "Novo projeto" ? (
                  <ListItem
                    button
                    key={text}
                    onClick={
                      text === "Meus projetos"
                        ? () => handleSendTo("/meus-projetos")
                        : () => handleSendTo("/projetos-startTo")
                    }
                  >
                    <ListItemIcon>
                      {text === "Meus projetos" ? (
                        <FormatListBulletedIcon />
                      ) : (
                        <HourglassEmptyIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ) : (
                  <ListItem button key={text} onClick={handleClickOpen}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )}
              </>
            ))}
          </List>
        )}
      </>
    </div>
  );

  return (
    <div>
      {(["left"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: { backgroundColor: "rgba(2, 2, 2, 0.8)" },
        }}
      >
        <FormProjeto
          ong_id={user?.id}
          close={handleClose}
          setNotificacao={setNotificacao}
        />
      </Dialog>
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
    </div>
  );
}
