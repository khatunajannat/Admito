export default function Footer() {
  return (
    <footer className="p-4 bg-navy md:p-8 lg:p-10">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="font-display flex justify-center items-center text-2xl font-semibold text-slate-800 hover:text-amber-700 transition"
        >
          <svg
            className="mr-2 h-8 w-8 text-slate-800 hover:text-amber-700 transition"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 19.5A2.5 2.5 0 016.5 17H20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Admito<span className="text-slate-800">.io</span>
        </a>

        <p className="my-6 text-amber-700">
          One portal for every step of your admission — circulars, application
          status, and important dates, all in one place.
        </p>

        <ul className="flex flex-wrap justify-center items-center mb-6 text-white">
          <li>
            <a
              href="#"
              className="mr-4 text-slate-800 hover:text-amber-700 md:mr-6"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-slate-800 hover:text-amber-700 md:mr-6"
            >
              Circulars
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-slate-800 hover:text-amber-700 md:mr-6"
            >
              Application Status
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-slate-800 hover:text-amber-700 md:mr-6"
            >
              Important Dates
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-slate-800 hover:text-amber-700 md:mr-6"
            >
              Contact
            </a>
          </li>
        </ul>

        <span className="text-sm text-slate-800 sm:text-center">
          © 2026{" "}
          <a href="#" className="text-amber-700 hover:underline">
            Admito
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
