import React from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import ViewListIcon from "@material-ui/icons/ViewList";

import WatchLaterIcon from "@material-ui/icons/WatchLater";

import HourglassFullIcon from "@material-ui/icons/HourglassFull";

import HistoryIcon from "@material-ui/icons/History";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import AddIcon from "@material-ui/icons/Add";

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

export default function TemporaryDrawer(props: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: props.open,
  });

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

  React.useEffect(() => {
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
            <ListItem button key={text}>
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
        {true ? (
          <List>
            {[
              "Projetos que sou voluntário",
              "Projetos que participei",
              "Meus projetos que irão começar",
            ].map((text, index) => (
              <ListItem button key={text}>
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
              <ListItem button key={text}>
                <ListItemIcon>
                  {text === "Meus projetos" ? (
                    <FormatListBulletedIcon />
                  ) : text === "Meus projetos que irão começar" ? (
                    <HourglassEmptyIcon />
                  ) : (
                    <AddIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
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
    </div>
  );
}
