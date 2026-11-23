import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Sparkles,
  Wind,
} from "lucide-react";
import { getCurrentLocation, getGeoLocation } from "../services/geo-location";

const Home = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openWeather = (locationData) => {
    navigate("/weather", { state: { locationData } });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const cityName = city.trim();

    if (!cityName) {
      setError("Enter a city name to search.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const locationData = await getGeoLocation(cityName);
      openWeather(locationData);
    } catch (searchError) {
      setError(searchError.message || "Could not find that city. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseLocation = async () => {
    setError("");
    setIsLoading(true);

    try {
      const locationData = await getCurrentLocation();
      openWeather(locationData);
    } catch (locationError) {
      setError(locationError.message || "Could not detect your location.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 px-6 py-10 text-white shadow-2xl shadow-sky-950/15 sm:px-10 sm:py-14 lg:px-14">
        <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-sky-100">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-amber-300" />
              A clearer view of your day
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Weather that helps you{" "}
              <span className="bg-gradient-to-r from-sky-300 to-emerald-200 bg-clip-text text-transparent">
                go with the day.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-blue-100/80 sm:text-lg">
              Get live conditions, practical weather tips, and a little more confidence in
              whatever comes next.
            </p>

            <form
              className="mt-8 rounded-2xl bg-white p-2 shadow-xl shadow-slate-950/20 sm:flex sm:items-center"
              onSubmit={handleSearch}
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
                <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400" />
                <span className="sr-only">Search city</span>
                <input
                  aria-describedby={error ? "search-error" : undefined}
                  aria-invalid={Boolean(error)}
                  autoComplete="address-level2"
                  className="w-full min-w-0 border-0 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
                  onChange={(event) => {
                    setCity(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Search a city..."
                  type="search"
                  value={city}
                />
              </label>
              <button
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 sm:w-auto"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Finding weather..." : "Get weather"}
                {!isLoading && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
              </button>
            </form>

            {error && (
              <p
                className="mt-3 rounded-xl border border-rose-200/20 bg-rose-950/30 px-4 py-3 text-sm text-rose-100"
                id="search-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-medium text-sky-100 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
              onClick={handleUseLocation}
              type="button"
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Use my current location
            </button>
          </div>

          <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="absolute inset-8 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative flex aspect-square items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]">
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-dashed border-white/15" />
              <CloudSun className="h-44 w-44 text-sky-100 drop-shadow-[0_12px_30px_rgba(125,211,252,0.35)]" strokeWidth={1.2} />
              <div className="absolute bottom-8 left-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md">
                <p className="text-xs font-medium uppercase tracking-wider text-sky-100/70">Your day, at a glance</p>
                <p className="mt-1 font-semibold">Live weather & useful tips</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="features-heading" className="py-12 sm:py-16">
        <div className="mb-6 max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">Made for everyday plans</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl" id="features-heading">
            The details that make a difference
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 text-sky-700">
              <Search aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">Any city, quickly</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Search for a place and get its current weather using its precise coordinates.
            </p>
          </article>
          <article className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <Wind aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">Live local conditions</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Check temperature, humidity, wind, and how the air feels right now.
            </p>
          </article>
          <article className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Droplets aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">Helpful suggestions</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get simple outfit and outdoor tips based on the weather conditions.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Home;
