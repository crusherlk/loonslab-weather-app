import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import WeatherCard from "./WeatherCard";
import { FaRotateLeft } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  getCurrentWeather,
  getWeatherForecast,
} from "../services/weatherService";
import { DateTime } from "luxon";
import { getCurrentUser } from "../services/authService";

const schema = yup.object({
  latitude: yup.string().required("Latitude is required!"),
  longitude: yup.string().required("Longitude is required!"),
});

function Dashboard() {
  const user = getCurrentUser();
  const form = useForm({
    defaultValues: {
      latitude: "",
      longitude: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  // form submition
  const onSubmit = (data) => {
    const { latitude, longitude } = data;
    getStats(latitude, longitude);
  };

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [weekForecast, setWeekForecast] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const get3DayForecast = (forecasts) => {
    const base_forecast_time = DateTime.fromSeconds(forecasts[0].dt)
      .setZone("utc")
      .toFormat("T")
      .toString();

    const filteredForecasts = forecasts.filter((f) => {
      if (
        DateTime.fromSeconds(f.dt).setZone("utc").toFormat("T").toString() ===
        base_forecast_time
      ) {
        return f;
      }
    });

    setWeekForecast(filteredForecasts);
    // console.log(filteredForecasts);

    const next3DayForecast = filteredForecasts.slice(1, 4);
    return next3DayForecast;
  };

  const getStats = async (lat, lon) => {
    setShowMore(false);
    // *** current weather
    await getCurrentWeather(lat, lon)
      .then((res) => {
        // console.log(res.data);
        setCurrentWeather(res.data);
      })
      .catch((err) => {
        console.log(err);
        setCurrentWeather(null);
      });

    // *** forecasts
    await getWeatherForecast(lat, lon)
      .then((res) => {
        const next3dayForecasts = get3DayForecast(res.data.list);
        setForecastList(next3dayForecasts);
      })
      .catch((err) => {
        // console.log(err);
        setForecastList([]);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <section className="container mx-auto">
      <div className="heading mb-8">
        <h2 className="text-2xl font-semibold capitalize text-center">
          Hello {user.name}, Checkout today&apos;s Weather Forecast
        </h2>
      </div>
      <div className="flex mb-8">
        <div className="w-1/2 flex justify-center">
          <Suspense fallback={<p className="text-sm uppercase">Loading...</p>}>
            <WeatherCard
              currentWeather={currentWeather}
              forecastList={forecastList}
            />
          </Suspense>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-control">
                <input
                  type="text"
                  id="latitude"
                  placeholder="6.927079"
                  {...register("latitude")}
                />
                <p className="text-sm pl-2 text-red-500">
                  {errors.latitude?.message}
                </p>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  id="longitude"
                  placeholder="79.861244"
                  {...register("longitude")}
                />
                <p className="text-sm pl-2 text-red-500">
                  {errors.longitude?.message}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn w-full">
                  Submit
                </button>
                <button
                  className="btn-outline"
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                    getStats();
                  }}
                >
                  <FaRotateLeft />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="btn-outline"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show less" : "Show More"}
        </button>
      </div>

      {showMore && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-8">
            Weather Forecast for the whole week!
          </h2>
          <div className="week-forecast-list flex gap-8">
            {weekForecast.map((f, idx) => (
              <WeekForecastItem key={idx} id={idx} f={f} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function WeekForecastItem({ f, id }) {
  return (
    <div className="forecast-item py-10 px-10 w-full bg-[#11c3b3] text-white rounded-2xl flex flex-col items-center justify-center gap-5">
      <div className="text-center">
        <p className="text-xl font-medium">
          {id === 0
            ? "Today"
            : DateTime.fromSeconds(f.dt)
                .setZone("utc")
                .toFormat("cccc")
                .toString()}
        </p>
        <p className="text-sm capitalize text-slate-200">
          {f.weather[0].description}
        </p>
      </div>
      <p className="text-6xl font-medium pl-5">{Math.round(f.main.temp)}°</p>
      <img
        alt="weather-icon"
        src={`http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
      />
    </div>
  );
}
export default Dashboard;
