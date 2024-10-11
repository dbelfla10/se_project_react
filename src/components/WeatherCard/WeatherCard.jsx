import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayTemperature = () => {
    return currentTemperatureUnit === "F"
      ? weatherData.temp.F + "°F"
      : weatherData.temp.C + "°C";
  };

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{displayTemperature()}</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}-time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
