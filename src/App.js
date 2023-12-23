import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=1828056885d23d83fda41ab38c290640`;

      setLoading(true);

      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("An error occurred", error);

          if (error.response && error.response.status === 404) {
            setError("City not found");
          } else {
            setError("An error occurred while fetching data");
          }
        })
        .finally(() => {
          setLoading(false);
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
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        {data.name && !loading && !error && (
          <>
            <div className="top">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
            </div>
            <div className="description">
              {data.weather && <p>{data.weather[0].main}</p>}
            </div>
            <div className="bottom">
              <div className="feels">
                <p>Feels like</p>
                <div className="bold">
                  {data.main && <p>{data.main.feels_like.toFixed()}°F</p>}
                </div>
              </div>
              <div className="humidity">
                <p>Humidity</p>
                <div className="bold">
                  {data.main && <p>{data.main.humidity.toFixed()}°F</p>}
                </div>
              </div>
              <div className="wind">
                <p>Wind speed</p>
                <div className="bold">
                  {data.wind && <p>{data.wind.speed}MPH</p>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
