import { Link, Outlet } from "react-router";
import { ArrowRight, CloudSun } from "lucide-react";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-sky-100 via-slate-50 to-emerald-50">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link aria-label="Meghla Weather home" className="flex items-center gap-3" to="/">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg shadow-sky-700/20">
              <CloudSun aria-hidden="true" className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-tight text-slate-800">
                Meghla
              </span>
              <span className="block text-xs font-medium text-slate-500">Weather, made clearer</span>
            </span>
          </Link>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-200 hover:bg-sky-50"
            to="/"
          >
            Find a city
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/70 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          Weather data provided by Open-Meteo
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;