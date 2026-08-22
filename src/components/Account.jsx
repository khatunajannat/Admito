export default function Account() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <img
            src="/Heading.png"
            alt="Admito"
            className="w-16 h-16 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-amber-700">
            My Account
          </h1>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Name
            </p>
            <p className="text-lg text-slate-800">
              Your Name
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Phone
            </p>
            <p className="text-lg text-slate-800">
              Your Phone Number
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Email
            </p>
            <p className="text-lg text-slate-800">
              your@email.com
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-amber-700 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>

      </div>
    </section>
  );
}