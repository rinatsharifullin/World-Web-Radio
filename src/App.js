import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Background from "./radio.png";
// import Button from "@material-ui/core/Button";

import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 100,
      width: 100,
    },

    control: {
      padding: theme.spacing(2),
    },
  })
);

function App() {
  const [stations, setStations] = useState([]);
  const classes = useStyles();

  const GetRussianStations = async () => {
    try {
      const response = await axios.request(
        "https://de1.api.radio-browser.info/json/stations/bycountry/russian"
      );
      setStations(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetRussianStations();
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
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: "center" }}>World Web Radio</h1>
      </header>
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {stations
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
  );
}

export default App;
