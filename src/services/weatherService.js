import axios from "axios";

const CURRENT_WEATHER_API = "https://api.openweathermap.org/data/2.5";
const API_KEY = "b52bfc5dcd67ad8b930f066c204bc17d";
const LAT = "6.927079";
const LON = "79.8612";
// const LAT = "aa";
// const LON = "";

export const getCurrentWeather = async (lat = LAT, lon = LON) => {
  return await axios.get(
    `${CURRENT_WEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
};

export const getWeatherForecast = async (lat = LAT, lon = LON) => {
  return await axios.get(
    `${CURRENT_WEATHER_API}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
};
