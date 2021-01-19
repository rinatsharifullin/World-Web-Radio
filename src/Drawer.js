import React from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
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
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Background from "./radio.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useEffect, useState } from "react";
import PauseIcon from "@material-ui/icons/Pause";
import Fab from "@material-ui/core/Fab";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  rootCard: {
    display: "flex",
    maxWidth: 500,
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    margin: 5,
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
    width: theme.spacing(0) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0) + 1,
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
  contentCard: {
    // flex: "1 0 auto",
    paddingTop: 0,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  playIcon: {
    height: 35,
    width: 35,
    flex: "0 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  cover: {
    width: 100,
    height: 100,
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [stations, setStations] = useState([]);
  const [counties, setCounties] = useState([]);
  const [stranaDisplay, setstranaDisplay] = useState("World Web Radio");
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const audio = document.getElementById("audio");
  const [PlayButton, setPlayButton] = useState(true);
  const handleMenuItemClick = (index, strana) => {
    setSelectedIndex(index);
    GetCountryStations(strana.name);
    setstranaDisplay(strana.name + " - " + strana.stationcount + " Stations");
    setOpen(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const HandleSearch = (e) => {
    if (e.target.value.length > 3) GetSearchStations(e.target.value);
  };
  const GetSearchStations = async (myInnerStation) => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/stations/search?name=" +
          myInnerStation
      );
      setStations(response.data);
    } catch (e) {
      console.log("Error happens in HandleSearch - ", e);
    }
  };

  const GetCountryStations = async (myInnerStation) => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/stations/bycountry/" +
          myInnerStation
      );
      setStations(response.data);
    } catch (e) {
      console.log("Error happens in GetCountryStations - ", e);
    }
  };
  const GetLastClicksStations = async () => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/stations/lastclick/33"
      );
      setStations(response.data);
    } catch (e) {
      console.log("Error happens in GetLastClicksStations - ", e);
    }
  };

  const GetCountryList = async () => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/countries"
      );
      setCounties(response.data);
    } catch (e) {
      console.log("Error happens in GetCountryList - ", e);
    }
  };

  useEffect(() => {
    GetCountryList();
    GetLastClicksStations();
  }, []);

  var newWindow = window;
  const openInNewTab = (url, name, favicon) => {
    newWindow = window.open(url, "radio", "width=300,height=100");
    var tmp = newWindow.document;
    tmp.write("<html><head><title>" + name + "</title>");
    tmp.write("</head><body> ");
    tmp.write(
      "<audio id='audio' controls autoplay>    <source id='audioSource' src='" +
        url +
        " ' />  </audio>"
    );
    tmp.write("</body></html>");
    tmp.close();
  };

  const playMe = async (e) => {
    try {
      var source = document.getElementById("audioSource");
      console.log(e);
      source.src = e;
      audio.load(); //call this to just preload the audio without playing
      audio.crossOrigin = "anonymous";
      audio.play(); //call this to play the song right away
      setPlayButton(false);
    } catch (error) {
      console.log("Error happens in playMe - ", error);
    }
  };

  const stopMe = () => {
    if (!audio.paused) {
      audio.pause();
      setPlayButton(true);
    } else {
      audio.play();
      setPlayButton(false);
    }
  };

  // const onScroll = () => {
  //   console.log("scroll");
  //   if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
  //     alert("At the bottom!");
  //   }
  // };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
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
            {stranaDisplay}
          </Typography>
          <audio id="audio">
            <source id="audioSource" src="" />
          </audio>
          <Fab
            className={classes.playIcon}
            color="secondary"
            aria-label="pause"
            onClick={stopMe}
            size="small"
          >
            {PlayButton ? <PlayArrowIcon /> : <PauseIcon />}
          </Fab>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={HandleSearch}
              onClick={(e) => (e.target.value = "")}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Radio by Country
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {counties
                .sort((a, b) => b.stationcount - a.stationcount)
                .map((strana, index) => (
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
          </AccordionDetails>
        </Accordion>
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
                    <Card className={classes.rootCard} key={item.changeuuid}>
                      <div className={classes.details}>
                        <div className={classes.controls}>
                          <IconButton
                            aria-label="play/pause"
                            onClick={() => {
                              setstranaDisplay(item.name);
                              playMe(item.url_resolved);
                            }}
                          >
                            <PlayArrowIcon />
                          </IconButton>
                          <Tooltip title="Play in pop-up window">
                            <IconButton
                              aria-label="play/pause"
                              onClick={() => {
                                setstranaDisplay(item.name);
                                openInNewTab(
                                  item.url_resolved,
                                  item.name,
                                  item.favicon
                                );
                              }}
                            >
                              <OpenInNewIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <CardContent className={classes.contentCard}>
                          <Typography component="div" variant="body1">
                            {item.name}
                          </Typography>
                        </CardContent>
                      </div>
                      <img
                        onClick={() => window.open(item.homepage, "_blank")}
                        style={{ objectFit: "contain", cursor: "pointer" }}
                        src={item.favicon}
                        width="100"
                        heigth="100"
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = Background;
                        }}
                      ></img>
                    </Card>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
}
