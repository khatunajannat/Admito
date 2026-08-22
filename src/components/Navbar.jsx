export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-800 backdrop-blur-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
          <div className="flex items-center space-x-1 group cursor-pointer">
            <div>
              <img
                src="/Heading.png"
                alt="Admito"
                className="w-10 h-10 sm:w-8 sm:h-8"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-medium ">
              <span className="text-[#805827] hover:text-[#FFD700]">
                Admito
              </span>
            </span>
          </div>
          {/*nav linlks*/}
          <div className="flex item-center space-x-6 lg:space-x-8 text-[#805827] font-medium text-sm sm:text-base md:text-lg">
            <a
              href="#Circular "
              className="text-[#805827] hover:text-[#FFD700]"
            >
              Circular
            </a>
            <a
              href="#Assessment"
              className="text-[#805827] hover:text-[#FFD700]"
            >
              Assessment
            </a>
            <a
              href="#Information"
              className="text-[#805827] hover:text-[#FFD700]"
            >
              Information
            </a>

            <a
              href="#Notification"
              className="text-[#805827] hover:text-[#FFD700]"
            >
              <svg
                className="w-6 h-6 text-[#805827] hover:text-[#FFD700] transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
