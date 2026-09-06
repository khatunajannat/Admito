import { Link } from "react-router-dom";
import { useState } from "react";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const scrollToFeatures = (e) => {
    e.preventDefault();
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-light">
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full border border-amber-700"></div>
      <div className="pointer-events-none absolute top-10 right-5 h-52 w-52 rounded-full border border-gold/15"></div>

      <div className="relative py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12">
        <a
          href="#"
          className="inline-flex justify-between items-center py-6 px-6 pr-4 mb-7 text-sm bg-white/5 rounded-full text-gray-200 hover:bg-white/10 transition"
          role="alert"
        >
          <span className="text-xs bg-gold rounded-full text-slate-800 hover:text-amber-700 transition font-semibold px-4 py-1.5 mr-3">
            New
          </span>
          <span className="text-sm font-medium text-slate-800 hover:text-amber-700 transition">
            Session 2026&ndash;27 admissions are now open
          </span>
          <svg
            className="ml-2 w-5 h-5"
            fill="slate-800 hover:amber-700 transition"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>

        <h1 className="font-display mb-4 text-4xl font-semibold tracking-tight leading-tight text-slate-800 md:text-5xl lg:text-6xl">
          Welcome to{" "}
          <span className="italic text-slate-800 hover:text-amber-700 transition font-medium">
            Admito
          </span>{" "}
          — begin your session here
        </h1>

        <p className="mb-8 text-lg font-normal text-amber-700 lg:text-xl sm:px-16 xl:px-48">
          One portal to visit the site, log in, and track everything about your
          admission — circulars, status, and important dates, all in one place.
        </p>

        <div className="flex flex-col mb-12 lg:mb-20 min-h-[52px] items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          {!isLoggedIn && (
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="inline-flex justify-center items-center py-3 px-6 text-sm font-semibold text-center text-slate-soft rounded-lg bg-gold hover:-translate-y-0.5 shadow-lg shadow-gold/25 transition"
            >
              Visit Site
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              className="inline-flex justify-center items-center py-3 px-6 text-sm font-semibold text-center text-slate-soft rounded-lg bg-gold hover:-translate-y-0.5 shadow-lg shadow-gold/25 transition"
            >
              Login/Sign-Up
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          )}

          {isLoggedIn && (
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="inline-flex justify-center items-center py-3 px-6 text-sm font-semibold text-center text-slate-soft rounded-lg bg-gold hover:-translate-y-0.5 shadow-lg shadow-gold/25 transition"
            >
              Visit Site
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          )}
        </div>

        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
            On this portal
          </span>
          <div className="flex flex-wrap justify-center items-center mt-8 gap-x-10 gap-y-5 text-gray-300 sm:justify-between">
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
              <svg
                className="h-6 w-6 text-slate-800 hover:text-amber-700 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M3 8l9-5 9 5-9 5-9-5zm0 0v8l9 5 9-5V8"
                />
              </svg>
              <span className="text-sm font-medium text-slate-800 hover:text-amber-700 transition">
                Recent Circulars
              </span>
            </div>

            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
              <svg
                className="h-6 w-6 text-slate-800 hover:text-amber-700 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-slate-800 hover:text-amber-700 transition">
                Application Status
              </span>
            </div>

            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
              <svg
                className="h-6 w-6 text-slate-800 hover:text-amber-700 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-slate-800 hover:text-amber-700 transition">
                Important Dates
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
