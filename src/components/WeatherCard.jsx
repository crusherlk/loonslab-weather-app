import Forecasts from "./Forecasts";

function WeatherCard({ currentWeather, forecastList }) {
  return (
    <div className="card w-[400px] py-10 bg-teal-600 text-white rounded-2xl flex flex-col items-center justify-center gap-5">
      {currentWeather !== null ? (
        <>
          <div className="text-center">
            <p className="text-xl font-medium">
              {currentWeather?.name}, {currentWeather?.sys?.country}
            </p>
            <p className="text-sm capitalize text-slate-300">
              {currentWeather.weather[0].description}
            </p>
          </div>
          <p className="text-8xl font-medium pl-7">
            {Math.round(currentWeather.main.temp)}°
          </p>
          <img
            alt="weather-icon"
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          />
          {forecastList.length !== 0 && <Forecasts forecasts={forecastList} />}
        </>
      ) : (
        <p>Couldn&apos;t fetch the data.</p>
      )}
    </div>
  );
}

export default WeatherCard;
