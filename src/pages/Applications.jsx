import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const STEP_LABELS = {
  applied: "Application submitted",
  form: "Applications opened",
  deadline: "Application deadline",
  admit_card: "Admit card",
  exam: "Admission exam",
  result: "Result",
};

function formatDate(dateStr) {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(dateStr) {
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
}

function relativeText(dateStr) {
  const days = daysUntil(dateStr);
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

const DOT = 16;

function Timeline({ steps }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;

        const dotStyle = {
          width: DOT,
          height: DOT,
          flexShrink: 0,
          borderRadius: "50%",
          borderWidth: 2,
          borderStyle: "solid",
          ...(s.current
            ? {
                borderColor: "#FFD700",
                background: "#805827",
                boxShadow: "0 0 0 4px rgba(255, 215, 0, 0.3)",
              }
            : s.done
              ? { borderColor: "#805827", background: "#805827" }
              : { borderColor: "#cbd5e1", background: "#ffffff" }),
        };

        const lineColor = steps[i + 1]?.done ? "#805827" : "#e2e8f0";

        return (
          <li key={`${s.key}-${i}`} style={{ display: "flex", gap: 14 }}>
            {/* Left column: dot + connecting line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: DOT,
                flexShrink: 0,
                paddingTop: 3,
              }}
            >
              <span style={dotStyle} />
              {!isLast && (
                <span
                  style={{
                    width: 2,
                    flex: 1,
                    marginTop: 4,
                    background: lineColor,
                  }}
                />
              )}
            </div>

            {/* Right column: label + date */}
            <div style={{ paddingBottom: isLast ? 0 : 22 }}>
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={`text-sm ${
                    s.current
                      ? "font-semibold text-slate-800"
                      : s.done
                        ? "font-medium text-slate-700"
                        : "text-slate-400"
                  }`}
                >
                  {STEP_LABELS[s.key] || s.title}
                </p>
                {s.current && (
                  <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-[11px] font-semibold text-[#805827]">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {formatDate(s.date)}
                {!s.done && ` · ${relativeText(s.date)}`}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ApplicationCard({ app, onWithdraw, withdrawing }) {
  const steps = app.timeline || [];
  const doneCount = steps.filter((s) => s.done).length;
  const percent = steps.length ? Math.round((doneCount / steps.length) * 100) : 0;
  const next = steps.find((s) => !s.done);
  const current = steps.find((s) => s.current);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Top: university + application number */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{app.university}</h2>
          <p className="text-sm text-gray-500">{app.unit}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">
            Application no.
          </p>
          <p className="font-mono text-sm font-semibold text-[#805827]">
            {app.applicationNo}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700">{app.title}</p>
      <p className="mt-1 text-xs text-slate-400">
        Applied on {formatDate(app.createdAt)} · Demo application
      </p>

      {/* Progress */}
      <div style={{ marginTop: 20 }}>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">
            {current ? STEP_LABELS[current.key] || current.title : "Not started"}
          </span>
          <span className="text-slate-400">
            {doneCount} of {steps.length} steps
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#805827] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {next
            ? `Next: ${STEP_LABELS[next.key] || next.title} ${relativeText(next.date)} (${formatDate(next.date)})`
            : "All announced steps are complete. Waiting for the next update."}
        </p>
      </div>

      {/* Timeline */}
      <div className="border-t border-slate-100" style={{ marginTop: 20, paddingTop: 20 }}>
        <Timeline steps={steps} />
      </div>

      {/* Actions */}
      <div
        className="flex flex-wrap items-center gap-3 border-t border-slate-100"
        style={{ marginTop: 20, paddingTop: 16 }}
      >
        {app.circular?.link && (
          <a
            href={app.circular.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#805827] hover:underline"
          >
            View official circular
          </a>
        )}
        <button
          type="button"
          onClick={() => onWithdraw(app)}
          disabled={withdrawing}
          className="ml-auto text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
        >
          {withdrawing ? "Withdrawing..." : "Withdraw"}
        </button>
      </div>
    </div>
  );
}

export default function Applications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [withdrawingId, setWithdrawingId] = useState(null);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/applications/my`, {
          headers: authHeaders(),
          signal: controller.signal,
        });
        if (res.status === 401) return handleUnauthorized();
        if (!res.ok) throw new Error("Failed to load your applications");
        setApplications(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWithdraw = async (app) => {
    if (!window.confirm(`Withdraw your application to ${app.university} (${app.unit})?`)) {
      return;
    }
    setWithdrawingId(app._id);
    try {
      const res = await fetch(`${API_URL}/applications/${app._id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.status === 401) return handleUnauthorized();
      if (!res.ok) throw new Error("Could not withdraw the application");
      setApplications((prev) => prev.filter((a) => a._id !== app._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setWithdrawingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      <div className="mx-auto max-w-4xl px-6 pb-6">
        <h1 className="text-3xl font-semibold text-slate-800">My Applications</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track every demo application you have made. Progress updates automatically
          from each university's important dates.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        {loading && (
          <p className="py-10 text-center text-sm text-slate-400">
            Loading your applications...
          </p>
        )}

        {!loading && error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="mb-1 text-lg font-semibold text-slate-800">
              No applications yet
            </p>
            <p className="mb-5 text-sm text-slate-500">
              Pick a circular and press "Apply (demo)" to get started.
            </p>
            <Link
              to="/circulars"
              className="inline-block rounded-lg bg-[#805827] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6b4620]"
            >
              Browse circulars
            </Link>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard
                key={app._id}
                app={app}
                onWithdraw={handleWithdraw}
                withdrawing={withdrawingId === app._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}