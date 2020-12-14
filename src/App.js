import axios from "axios";

import { useEffect, useState } from "react";

function App() {
  const [stations, setStations] = useState([]);

  const GetRussianStations = async () => {
    try {
      const response = await axios.request(
        "http://all.api.radio-browser.info/json/stations/bycountry/russia"
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
  var internetradio = require("node-internet-radio");
  var testStream = "";
  internetradio.getStationInfo(testStream, function (error, station) {
    console.log(station);
  });

  const playMe = (e) => {
    // const myUrl = stations.filter((item) => e.target.innerHTML === item.name);
    console.log(e.target.id);
    audio.pause();
    audio = new Audio(e.target.id);
    audio.play();
    testStream = e.target.id;
    internetradio.getStationInfo(testStream, function (error, station) {
      console.log(station);
    });
  };

  const stopMe = () => {
    audio.pause();
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>World Web Radio</h1>
        <ul>
          {stations.map((item) => (
            <li>
              <button id={item.url_resolved} onClick={playMe}>
                {item.name}
              </button>
              <button onClick={stopMe}>Stop</button>
              {/* <img
                src={item.favicon}
                width="50"
                heigth="50"
                alt={item.name}
              ></img> */}
              <p>Bitrate - {item.bitrate}</p>
              <a href={item.homepage} target="_blank">
                Home page
              </a>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
