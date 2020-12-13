import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import Player from "./Player";
import { useEffect, useState } from "react";

// const playMe = (url) => {
// try {
//   var audio = new Audio(url);
//   audio.play();
// } catch (error) {
//   console.error(error);
// }
//   return audio.isPlaying;
// };

// GetRussianSatations();
function App() {
  const [stations, setStations] = useState([]);
  // const stations = GetRussianSatations();
  // console.log(stations);

  const GetRussianSatations = async () => {
    try {
      const response = await axios.request(
        "http://all.api.radio-browser.info/json/stations/bycountry/russia"
      );
      // var par = JSON.parse(response.data);
      // console.log(response.data);
      // console.log(response.data[0].url);
      setStations(response.data);
      console.log("GetRussianSatations call");
      // return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetRussianSatations();
  }, []);
  // console.log(stations.keys.url);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Player url="http://ic4.101.ru:8000/stream/air/aac/64/200" />
        {/* <a>{stations}</a> */}
        <a>Privet</a>
        <ul>
          {stations.map((item) => (
            <li>{item.url}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
