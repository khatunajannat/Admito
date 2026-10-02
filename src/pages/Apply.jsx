import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const STATUS_PATH = "/applications";

const BOARDS = [
  "Dhaka",
  "Rajshahi",
  "Cumilla",
  "Jashore",
  "Chattogram",
  "Barishal",
  "Sylhet",
  "Dinajpur",
  "Mymensingh",
  "Madrasah",
  "Technical",
];

const EMPTY_ACADEMIC = { board: "", year: "", gpa: "" };

const INITIAL_FORM = {
  fullName: "",
  fatherName: "",
  motherName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  ssc: { ...EMPTY_ACADEMIC },
  hsc: { ...EMPTY_ACADEMIC },
};

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#805827] focus:border-[#805827] block w-full p-2.5";

function formatDate(dateStr) {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


function buildPayload(form) {
  const academic = (a) => {
    const out = {};
    if (a.board) out.board = a.board;
    if (a.year !== "") out.year = Number(a.year);
    if (a.gpa !== "") out.gpa = Number(a.gpa);
    return out;
  };

  const payload = {
    fullName: form.fullName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    ssc: academic(form.ssc),
    hsc: academic(form.hsc),
  };

  ["fatherName", "motherName", "address"].forEach((key) => {
    if (form[key].trim()) payload[key] = form[key].trim();
  });
  if (form.dateOfBirth) payload.dateOfBirth = form.dateOfBirth;
  if (form.gender) payload.gender = form.gender;

  return payload;
}

function Field({ label, required, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

function AcademicFields({ group, title, values, onChange }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Board">
          <select
            name={`${group}.board`}
            value={values.board}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select board</option>
            {BOARDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Passing year">
          <input
            type="number"
            name={`${group}.year`}
            value={values.year}
            onChange={onChange}
            min="1990"
            max={new Date().getFullYear()}
            placeholder="e.g. 2023"
            className={inputClass}
          />
        </Field>
        <Field label="GPA (out of 5)">
          <input
            type="number"
            name={`${group}.gpa`}
            value={values.gpa}
            onChange={onChange}
            min="0"
            max="5"
            step="0.01"
            placeholder="e.g. 5.00"
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
}

export default function Apply() {
  const { circularId } = useParams();
  const navigate = useNavigate();

  const [circular, setCircular] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCircular() {
      setLoading(true);
      setLoadError("");
      try {
        const res = await fetch(`${API_URL}/circulars/${circularId}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Circular not found");
        setCircular(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setLoadError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCircular();
    return () => controller.abort();
  }, [circularId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [group, field] = name.split(".");
      setForm((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setAlreadyApplied(false);
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ circularId, formData: buildPayload(form) }),
      });
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/login");
        return;
      }
      if (res.status === 409) setAlreadyApplied(true);
      if (!res.ok) throw new Error(data.message || "Could not submit application");

      setSubmitted(data.application);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const pageWrapper = (children) => (
    <section className="min-h-screen bg-stone-200 pt-24 sm:pt-28 md:pt-32 pb-16 px-4">
      <div className="max-w-3xl mx-auto">{children}</div>
    </section>
  );

  if (loading) {
    return pageWrapper(
      <p className="text-sm text-slate-400 py-10 text-center">Loading circular...</p>
    );
  }

  if (loadError || !circular) {
    return pageWrapper(
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-red-600 mb-4">{loadError || "Circular not found"}</p>
        <Link to="/circulars" className="text-[#805827] font-medium hover:underline">
          Back to circulars
        </Link>
      </div>
    );
  }

  if (circular.status === "closed") {
    return pageWrapper(
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h1 className="text-xl font-semibold text-slate-800 mb-2">
          Applications are closed
        </h1>
        <p className="text-slate-500 mb-4">
          {circular.university} ({circular.unit}) is no longer accepting applications.
        </p>
        <Link to="/circulars" className="text-[#805827] font-medium hover:underline">
          Back to circulars
        </Link>
      </div>
    );
  }

  if (submitted) {
    return pageWrapper(
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-1">
          Demo application submitted
        </h1>
        <p className="text-sm text-slate-500 mb-5">
          {circular.university} · {circular.unit}
        </p>
        <p className="text-xs uppercase tracking-wide text-slate-400">Application number</p>
        <p className="font-mono text-lg font-semibold text-[#805827] mb-2">
          {submitted.applicationNo}
        </p>
        <p className="text-xs text-slate-400 mb-6">
          This was a demo. Nothing was sent to the university.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={STATUS_PATH}
            className="text-sm font-medium text-white bg-[#805827] hover:bg-[#6b4620] rounded-lg px-4 py-2 transition-colors duration-150"
          >
            Track application status
          </Link>
          <Link
            to="/circulars"
            className="text-sm font-medium text-[#805827] border border-[#805827] hover:bg-[#805827] hover:text-white rounded-lg px-4 py-2 transition-colors duration-150"
          >
            Back to circulars
          </Link>
        </div>
      </div>
    );
  }

  return pageWrapper(
    <>
      <Link
        to="/circulars"
        className="inline-block text-sm text-slate-500 hover:text-[#805827] mb-4"
      >
        ← Back to circulars
      </Link>

      {/* Circular summary */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
        <h1 className="text-2xl font-semibold text-slate-800">{circular.university}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{circular.unit}</p>
        <p className="text-sm text-gray-700 mt-3">{circular.title}</p>
        <p className="text-xs text-gray-500 mt-3">
          Apply by: {formatDate(circular.applyDeadline)} · Exam:{" "}
          {formatDate(circular.examDate)}
        </p>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-4 py-3 mb-6">
        <span className="font-semibold">Demo application.</span> This form is saved in
        Admito for practice and tracking only. It is not sent to the university.
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* Personal information */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Personal information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" required className="md:col-span-2">
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Father's name">
              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
            <Field label="Mother's name">
              <input
                type="text"
                name="motherName"
                value={form.motherName}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
            <Field label="Date of birth">
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>
            <Field label="Gender">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Phone" required>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                pattern="\+?[0-9]{10,15}"
                title="10 to 15 digits, optionally starting with +"
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Address" className="md:col-span-2">
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        {/* Academic information */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Academic information
          </h2>
          <div className="space-y-6">
            <AcademicFields
              group="ssc"
              title="SSC / Equivalent"
              values={form.ssc}
              onChange={handleChange}
            />
            <AcademicFields
              group="hsc"
              title="HSC / Equivalent"
              values={form.hsc}
              onChange={handleChange}
            />
          </div>
        </div>

        {submitError && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
            {submitError}
            {alreadyApplied && (
              <>
                {" "}
                <Link to={STATUS_PATH} className="font-medium underline">
                  View your application
                </Link>
              </>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            to="/circulars"
            className="text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2.5"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="text-sm font-medium text-white bg-[#805827] hover:bg-[#6b4620] focus:ring-4 focus:outline-none focus:ring-[#805827]/30 rounded-lg px-5 py-2.5 transition-colors duration-150 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit demo application"}
          </button>
        </div>
      </form>
    </>
  );
}