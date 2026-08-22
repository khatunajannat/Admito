export default function Signup() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <img
            src="/Heading.png"
            alt="Admito"
            className="w-16 h-16 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-amber-700">
            Create Account
          </h1>

          <p className="text-slate-600 mt-2">
            Sign up for your Admito account
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <span className="text-amber-700 font-medium cursor-pointer hover:text-amber-600">
            Login
          </span>
        </p>

      </div>
    </section>
  );
}