import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(
    () => !!localStorage.getItem("userId"),
  );

  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load account");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-slate-800 flex items-center justify-center px-4">
        <p className="text-white">Loading account...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-slate-800 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <img
            src="/Heading.png"
            alt="Admito"
            className="w-20 h-15 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-[#805827] mb-2">My Account</h1>

          <p className="text-slate-600 mb-6">
            {error || "No user is signed in."}
          </p>

          <Link
            to="/login"
            className="inline-block w-full bg-[#805827] text-white py-3 rounded-lg font-medium hover:bg-[#6b4620] transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <img
            src="/Heading.png"
            alt="Admito"
            className="w-20 h-15 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-[#805827]">My Account</h1>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Name
            </p>
            <p className="text-lg text-slate-800">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Phone
            </p>
            <p className="text-lg text-slate-800">
              {user.phone}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Email
            </p>
            <p className="text-lg text-slate-800">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-[#805827] text-white py-3 rounded-lg font-medium hover:bg-[#6b4620] transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
