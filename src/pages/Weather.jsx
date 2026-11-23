import { useLocation } from "react-router";
import { getWeather, WMO_CODES } from "../services/getWeather";
import { useEffect, useState } from "react";
import { Droplets, Thermometer, Wind } from "lucide-react";

const Weather = () => {
  const location = useLocation();
  const locationData = location.state?.locationData;

  const [weatherData, setWeatherData] = useState(null);
  const condition = weatherData
    ? WMO_CODES[weatherData.weatherCode] ?? {
        label: "Weather",
        description: "Current weather conditions",
        icon: "🌤️",
      }
    : null;

  useEffect(() => {
    if (!locationData) {
      console.error("No location data provided.");
      return;
    }

    const fetchWeatherData = async () => {
      try {
        const weatherData = await getWeather(locationData);
        setWeatherData(weatherData);
        // console.log("Weather data:", weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();

  }, [locationData]);

  return (
    <div className="mx-auto grid min-h-[60vh] max-w-5xl place-items-center py-8">
      <div className="w-full">
        {weatherData && (
          <section className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_-24px_rgba(30,64,175,0.3)] backdrop-blur sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-sky-100/80 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                    Current weather
                  </p>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                    {weatherData.location}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">Today's forecast</p>
                </div>
                <div
                  aria-label={condition.label}
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-sky-50 text-4xl shadow-inner sm:h-20 sm:w-20 sm:text-5xl"
                  role="img"
                >
                  {condition.icon}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
                <div>
                  <p className="font-semibold text-slate-600">{condition.label}</p>
                  <div className="mt-1 flex items-start text-slate-900">
                    <span className="text-7xl font-extrabold leading-none tracking-tighter sm:text-8xl">
                      {weatherData.temperature}
                    </span>
                    <span className="mt-2 text-3xl font-semibold text-slate-500">°C</span>
                  </div>
                  <p className="mt-3 text-slate-500">{condition.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-sky-50/80 p-4">
                    <Droplets aria-hidden="true" className="mb-3 h-5 w-5 text-sky-600" />
                    <p className="text-sm text-slate-500">Humidity</p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {weatherData.humidity}%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50/80 p-4">
                    <Wind aria-hidden="true" className="mb-3 h-5 w-5 text-emerald-600" />
                    <p className="text-sm text-slate-500">Wind speed</p>
                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {weatherData.windSpeed} <span className="text-sm font-medium">m/s</span>
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-amber-50/80 p-4">
                    <Thermometer aria-hidden="true" className="h-5 w-5 shrink-0 text-amber-600" />
                    <p className="text-sm text-slate-500">Feels like</p>
                    <p className="ml-auto text-xl font-bold text-slate-800">
                      {weatherData.feelsLike}°C
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      
    </div>
  );
};

export default Weather;
