import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <img
            src="/Heading.png"
            alt="Admito"
            className="w-16 h-16 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-[#805827]">
            Welcome Back
          </h1>

          <p className="text-slate-600 mt-2">
            Login to your Admito account
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805827]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805827]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#805827] text-white py-3 rounded-lg font-medium hover:bg-[#6b4620] transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#805827] font-medium cursor-pointer hover:text-[#FFD700]"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </section>
  );
}