import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1828056885d23d83fda41ab38c290640`;
  // const [cityNotFound, setCityNotFound] = useState(false);

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);

          // console.log(response.data);
        })
        .catch((error) => {
          console.error("An error occured", error);
          // if (error.response && error.response.status === 404) {
          //   setCityNotFound(true);
          // } else {
          //   setCityNotFound(false);
          // }
        });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        <div className="top">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
              </p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? <p>{data.main.humidity.toFixed()}°F</p> : null}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? <p>{data.wind.speed}MPH</p> : null}
              </p>
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
