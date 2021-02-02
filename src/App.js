import React, { useState } from "react";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}${api.key}&q=${query}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.current != "undefined"
          ? weather.current.temp_c > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <label>
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              id="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </label>
        </div>
        {typeof weather.current != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.location.name}, {weather.location.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.current.temp_c)}°C
              </div>

              <div className="weather">{weather.current.condition.text}</div>
            </div>
          </div>
        ) : (
            ""
          )}
      </main>
    </div>
  );
}

export default App;