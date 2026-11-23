import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowLeft, Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import { getWeather, WMO_CODES } from "../services/getWeather";
import { getWeatherRecommendations } from "../utils/weather-recommendations";

const Weather = () => {
  const routeLocation = useLocation();
  const locationData = routeLocation.state?.locationData;
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!locationData) {
      setError("Choose a city or use your current location to see the weather.");
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setError("");
    setIsLoading(true);
    setWeatherData(null);

    const fetchWeatherData = async () => {
      try {
        const data = await getWeather(locationData, { signal: controller.signal });
        setWeatherData(data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Could not load weather data. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchWeatherData();
    return () => controller.abort();
  }, [locationData]);

  const condition = weatherData
    ? WMO_CODES[weatherData.weatherCode] ?? {
        label: weatherData.conditionLabel || "Weather",
        description: weatherData.description || "Current weather conditions",
        icon: weatherData.icon || "🌤️",
      }
    : null;

  return (
    <div className="mx-auto grid min-h-[60vh] max-w-5xl place-items-center py-6 sm:py-10">
      {isLoading && (
        <div aria-live="polite" className="flex flex-col items-center gap-4 text-slate-600">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
          <p className="font-medium">Checking the latest weather...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="w-full max-w-lg rounded-3xl border border-white/80 bg-white/90 p-8 text-center shadow-xl shadow-slate-900/5">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-600">
            <MapPin aria-hidden="true" className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-800">Weather unavailable</h1>
          <p className="mt-2 text-slate-500">{error}</p>
          <Link
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
            to="/"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Search for a place
          </Link>
        </div>
      )}

      {!isLoading && weatherData && condition && (
        <div className="w-full space-y-5">
          <section className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_-24px_rgba(30,64,175,0.3)] backdrop-blur sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-sky-100/80 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                    Current weather
                  </p>
                  <h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                    {weatherData.location}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">Live conditions right now</p>
                </div>
                <div
                  aria-label={condition.label}
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-sky-50 text-4xl shadow-inner sm:h-20 sm:w-20 sm:text-5xl"
                  role="img"
                >
                  {weatherData.icon || condition.icon}
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

          <section
            aria-labelledby="recommendations-heading"
            className="mx-auto w-full max-w-3xl rounded-[1.75rem] border border-white/80 bg-white/80 p-6 shadow-sm shadow-slate-900/5 backdrop-blur sm:p-8"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Weather-wise
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-800" id="recommendations-heading">
                A few helpful tips
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {getWeatherRecommendations(weatherData).map((recommendation) => (
                <article
                  className="flex gap-3 rounded-2xl bg-slate-50/90 p-4"
                  key={recommendation.title}
                >
                  <span aria-hidden="true" className="text-2xl">
                    {recommendation.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-800">{recommendation.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {recommendation.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Weather;
