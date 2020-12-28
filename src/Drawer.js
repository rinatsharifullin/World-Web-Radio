import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Background from "./radio.png";

import { useEffect, useState } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  paper: {
    height: 100,
    width: 100,
  },

  control: {
    padding: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [stations, setStations] = useState([]);
  const [counties, setCounties] = useState([]);
  const [stranaDisplay, setstranaDisplay] = useState("");

  // const [myStation, setStation] = useState("ireland");
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMenuItemClick = (index, strana) => {
    setSelectedIndex(index);
    stopMe();
    GetCountryStations(strana.name);
    setstranaDisplay(strana.name);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const GetCountryStations = async (myInnerStation) => {
    try {
      console.log(myInnerStation);
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/stations/bycountry/" +
          myInnerStation
      );
      setStations(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const GetLastClicksStations = async () => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/stations/lastclick/33"
      );
      setStations(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const GetCountryList = async () => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/countries"
      );
      setCounties(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetCountryList();
    GetLastClicksStations();
  }, []);

  var audio = new Audio();

  //Read now playing

  const playMe = async (e) => {
    // const myUrl = stations.filter((item) => e.target.innerHTML === item.name);
    console.log(e.target.id);
    audio.pause();
    try {
      audio = new Audio(e.target.id);
      audio.play();
    } catch (error) {
      console.log("Error happens - ", error);
    }
  };

  const stopMe = () => {
    audio.pause();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            World Web Radio {stranaDisplay}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {counties.map((strana, index) => (
            <ListItem
              key={strana.name}
              selected={index === selectedIndex}
              button
              onClick={() => handleMenuItemClick(index, strana)}
            >
              <ListItemText primary={strana.name} />
              <ListItemText />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div className="App">
          <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {stations
                  .sort((a, b) => b.clickcount - a.clickcount)
                  .filter((item) => item.url_resolved.slice(-4) !== "m3u8")
                  .map((item) => (
                    <>
                      <Grid item key={item.changeuuid}>
                        <Paper className={classes.paper}>
                          <button
                            id={item.url_resolved}
                            onClick={playMe}
                            style={{
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            {item.name}
                            <button
                              onClick={stopMe}
                              style={{ position: "absolute", top: 0, left: 0 }}
                            >
                              Stop
                            </button>
                          </button>
                        </Paper>
                        <Paper
                          className={classes.paper}
                          style={{ overflow: "hidden" }}
                        >
                          <img
                            src={item.favicon}
                            width="100%"
                            heigth="100%"
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = Background;
                            }}
                          ></img>
                        </Paper>
                      </Grid>
                    </>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
}
