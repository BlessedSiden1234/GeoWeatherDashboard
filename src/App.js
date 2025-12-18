import React, { useState } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import {
  WEATHER_API_URL,
  WEATHER_API_KEY,
} from "./components/search/api";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [randomCities, setRandomCities] = useState([]);

  const fetchWeather = (lat, lon, label) => {
    return fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => ({
        city: label,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        wind: data.wind.speed,
        humidity: data.main.humidity,
      }))
      .catch((err) => console.error(err));
  };

  const searchDataHandler = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const weather = await fetchWeather(lat, lon, searchData.label);
    setCurrentWeather(weather);
  };

  // Example: generate 6 random cities (hardcoded for demo)
  useEffect(() => {
    const cities = [
      { label: "New York, US", value: "40.7128 -74.0060" },
      { label: "London, UK", value: "51.5074 -0.1278" },
      { label: "Tokyo, JP", value: "35.6762 139.6503" },
      { label: "Sydney, AU", value: "-33.8688 151.2093" },
      { label: "Paris, FR", value: "48.8566 2.3522" },
      { label: "Rio de Janeiro, BR", value: "-22.9068 -43.1729" },
    ];

    Promise.all(
      cities.map((c) => {
        const [lat, lon] = c.value.split(" ");
        return fetchWeather(lat, lon, c.label);
      })
    ).then((data) => setRandomCities(data));
  }, []);

  return (
    <div className="container">
      <Search searchDataHandler={searchDataHandler} />
      <CurrentWeather data={currentWeather} randomCities={randomCities} />
    </div>
  );
}

export default App;
