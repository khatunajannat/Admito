import { useState } from "react";
import { adminApi } from "./adminApi";

export default function AdminLogin({ onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminApi.login(email, password);
      if (data.user.role !== "admin") {
        setError("This account doesn't have admin access.");
        setLoading(false);
        return;
      }
      localStorage.setItem("admito_token", data.token);
      localStorage.setItem("admito_admin", JSON.stringify(data.user));
      onLoggedIn(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-slate-200 p-6"
      >
        <h1 className="text-xl font-semibold text-slate-800 mb-1">Admin Login</h1>
        <p className="text-sm text-slate-500 mb-5">
          Sign in with an admin account to manage circulars and important dates.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">{error}</p>
        )}

        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#805827] focus:border-[#805827] p-2.5"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#805827] focus:border-[#805827] p-2.5"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#805827] text-white text-sm font-medium py-2.5 hover:bg-[#6b4a20] transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
