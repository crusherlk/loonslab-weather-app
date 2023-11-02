import { DateTime } from "luxon";

function Forecasts({ forecasts }) {
  return (
    <div className="forecast-list flex pt-5 gap-8">
      {forecasts.map((f, idx) => (
        <ForecastItem
          key={idx}
          day={f.dt}
          temp={f.main.temp}
          icon={f.weather[0].icon}
        />
      ))}
    </div>
  );
}

function ForecastItem({ day, temp, icon }) {
  return (
    <div className="forecast-item flex flex-col items-center gap-1">
      <img
        className="h-12"
        alt="weather-icon"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      />
      <p className="text-sm leading-none text-slate-300 capitalize">
        {DateTime.fromSeconds(day).setZone("utc").toFormat("cccc").toString()}
      </p>
      <p className="text-base leading-none">{Math.round(temp)}°</p>
    </div>
  );
}
export default Forecasts;
