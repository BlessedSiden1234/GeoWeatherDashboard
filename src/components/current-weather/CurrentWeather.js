import "./CurrentWeather.css";

function CurrentWeather({ data, randomCities }) {
  return (
    <div className="current-weather-container">
      {/* Current searched city */}
      {data && (
        <div className="weather">
          <div className="top">
            <div className="left">
              <p className="city">{data.city}</p>
              <p className="description">{data.description}</p>
            </div>

            <img
              className="right"
              src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt={data.description}
            />
          </div>

          <div className="bottom">
            <p className="temperature">{Math.round(data.temp)}°C</p>
            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label">Details</span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">Feels like</span>
                <span className="parameter-value">
                  {Math.round(data.feelsLike)}°C
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">Wind</span>
                <span className="parameter-value">{data.wind} m/s</span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">Humidity</span>
                <span className="parameter-value">{data.humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Random cities grid */}
      <div className="random-cities-grid">
        {randomCities &&
          randomCities.map((city, idx) => (
            <div className="weather" key={idx}>
              <div className="top">
                <div className="left">
                  <p className="city">{city.city}</p>
                  <p className="description">{city.description}</p>
                </div>

                <img
                  className="right"
                  src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
                  alt={city.description}
                />
              </div>

              <div className="bottom">
                <p className="temperature">{Math.round(city.temp)}°C</p>
                <div className="details">
                  <div className="parameter-row">
                    <span className="parameter-label">Feels like</span>
                    <span className="parameter-value">
                      {Math.round(city.feelsLike)}°C
                    </span>
                  </div>

                  <div className="parameter-row">
                    <span className="parameter-label">Wind</span>
                    <span className="parameter-value">{city.wind} m/s</span>
                  </div>

                  <div className="parameter-row">
                    <span className="parameter-label">Humidity</span>
                    <span className="parameter-value">{city.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CurrentWeather;
