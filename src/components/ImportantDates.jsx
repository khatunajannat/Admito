import { useState, useMemo } from "react";

// Dummy data
const events = [
  {
    id: 1,
    title: "DU Kha Unit Form Fill-up Starts",
    university: "Dhaka University",
    type: "public",
    category: "form",
    date: "2026-08-25",
  },
  {
    id: 2,
    title: "NSU Fall Admission Deadline",
    university: "North South University",
    type: "private",
    category: "deadline",
    date: "2026-08-28",
  },
  {
    id: 3,
    title: "BUET Admission Test",
    university: "BUET",
    type: "public",
    category: "exam",
    date: "2026-09-05",
  },
  {
    id: 4,
    title: "BRAC University Result Publication",
    university: "BRAC University",
    type: "private",
    category: "result",
    date: "2026-09-08",
  },
  {
    id: 5,
    title: "RU Ka Unit Exam",
    university: "Rajshahi University",
    type: "public",
    category: "exam",
    date: "2026-09-12",
  },
  {
    id: 6,
    title: "AIUB Spring Form Fill-up Ends",
    university: "AIUB",
    type: "private",
    category: "form",
    date: "2026-09-15",
  },
  {
    id: 7,
    title: "CU Admission Result",
    university: "Chittagong University",
    type: "public",
    category: "result",
    date: "2026-09-20",
  },
  {
    id: 8,
    title: "EWU Application Deadline",
    university: "East West University",
    type: "private",
    category: "deadline",
    date: "2026-09-22",
  },
  {
    id: 9,
    title: "AUST Fall Admission Form Fill-up Starts",
    university: "Ahsanullah University of Science and Technology (AUST)",
    type: "private",
    category: "form",
    date: "2026-08-30",
  },
  {
    id: 10,
    title: "AUST Admission Test",
    university: "Ahsanullah University of Science and Technology (AUST)",
    type: "private",
    category: "exam",
    date: "2026-09-18",
  },
  {
    id: 11,
    title: "AUST Admission Result Publication",
    university: "Ahsanullah University of Science and Technology (AUST)",
    type: "private",
    category: "result",
    date: "2026-09-25",
  },
];

const categoryStyles = {
  form: {
    label: "Form Fill-up",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700",
  },
  deadline: {
    label: "Deadline",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700",
  },
  exam: {
    label: "Exam Date",
    dot: "bg-[#FFD700]",
    badge: "bg-yellow-50 text-[#805827]",
  },
  result: {
    label: "Result",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
};

function EventCard({ e }) {
  const cat = categoryStyles[e.category];
  return (
    <div className="relative flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${cat.dot}`}
      />
      <div className="ml-1 flex flex-col items-center justify-center w-14 shrink-0 rounded-lg bg-slate-50 py-2">
        <span className="text-xs font-semibold text-slate-400 uppercase">
          {new Date(e.date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
          })}
        </span>
        <span className="text-xl font-bold text-slate-800">
          {new Date(e.date + "T00:00:00").getDate()}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-800">{e.title}</p>
          <span
            className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${cat.badge}`}
          >
            {cat.label}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{e.university}</p>
        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
            e.type === "public"
              ? "bg-[#805827]/10 text-[#805827]"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {e.type === "public" ? "Public University" : "Private University"}
        </span>
      </div>
    </div>
  );
}

//  month calendar grid
function CalendarView({ events, monthDate, setMonthDate }) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      const d = new Date(e.date + "T00:00:00");
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        map[day] = map[day] ? [...map[day], e] : [e];
      }
    });
    return map;
  }, [events, year, month]);

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = monthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setMonthDate(new Date(year, month - 1, 1))}
          className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
        >
          ←
        </button>
        <p className="text-sm font-semibold text-slate-800">{monthLabel}</p>
        <button
          onClick={() => setMonthDate(new Date(year, month + 1, 1))}
          className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-800 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) =>
          day === null ? (
            <div key={i} />
          ) : (
            <div
              key={i}
              className="aspect-square rounded-lg border border-transparent p-1 text-left hover:border-slate-200"
            >
              <span className="text-xs font-medium text-slate-600">{day}</span>
              <div className="mt-1 flex flex-wrap gap-0.5">
                {(eventsByDay[day] || []).slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    title={e.title}
                    className={`h-1.5 w-1.5 rounded-full ${categoryStyles[e.category].dot}`}
                  />
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-100 pt-3">
        {Object.entries(categoryStyles).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${val.dot}`} />
            <span className="text-xs text-slate-500">{val.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImportantDates() {
  const [view, setView] = useState("list"); // "list" | "calendar"
  const [filter, setFilter] = useState("all"); // "all" | "public" | "private"
  const [monthDate, setMonthDate] = useState(new Date(2026, 7, 1)); // Aug 2026

  const filtered = events
    .filter((e) => filter === "all" || e.type === filter)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-stone-200 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      <div className="mx-auto max-w-4xl px-6 pb-6">
        <h1 className="text-3xl font-semibold text-slate-800">
          Important Dates
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Form fill-up, deadlines, exam dates, and result publications across
          public and private universities.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
            {["all", "public", "private"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                  filter === f
                    ? "bg-[#805827] text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
            <button
              onClick={() => setView("list")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                view === "list"
                  ? "bg-[#805827] text-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                view === "calendar"
                  ? "bg-[#805827] text-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        {view === "list" ? (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400">
                No events found for this filter.
              </p>
            ) : (
              filtered.map((e) => <EventCard key={e.id} e={e} />)
            )}
          </div>
        ) : (
          <CalendarView
            events={filtered}
            monthDate={monthDate}
            setMonthDate={setMonthDate}
          />
        )}
      </div>
    </div>
  );
}
