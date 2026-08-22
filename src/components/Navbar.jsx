export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-800 backdrop-blur-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
          <div>
            <img
              src="/Heading.png"
              alt="Admito"
              className="w-10 h-10 sm:w-8 sm:h-8"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
