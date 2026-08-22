import { Link } from "react-router-dom";

export default function Navbar() {
  const unreadCount = 3;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-800 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
          {/* Logo -> always goes home */}
          <Link
            to="/"
            className="flex items-center space-x-1 group cursor-pointer"
          >
            <div className="relative w-10 h-10 sm:w-8 sm:h-8">
              <img
                src="/Heading.png"
                alt="Admito"
                className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0"
              />
              <img
                src="/HeadingYellow.png"
                alt="Admito"
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-[#805827] group-hover:text-[#FFD700]">
                Admito
              </span>
            </span>
          </Link>

          {/* nav links */}
          <div className="flex items-center space-x-6 lg:space-x-8 text-[#805827] font-medium text-sm sm:text-base md:text-lg">
            <Link to="/circulars" className="text-[#805827] hover:text-[#FFD700]">
              Circular
            </Link>
            <Link
              to="/assessment"
              className="text-[#805827] hover:text-[#FFD700]"
            >
              Assessment
            </Link>
            <Link
              to="/information"
              className="text-[#805827] hover:text-[#FFD700]"
            >
              Information
            </Link>

            {/* Bell -> routes to /notifications */}
            <Link
              to="/notifications"
              className="relative text-[#805827] hover:text-[#FFD700]"
              aria-label="Notifications"
            >
              <svg
                className="w-6 h-6 transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-red-500 border border-slate-800 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Account -> routes to /account */}
            <Link
              to="/account"
              className="text-[#805827] hover:text-[#FFD700]"
              aria-label="Account"
            >
              <svg
                className="w-6 h-6 transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}