import { useState, useMemo } from "react";

// Sample assessment data — swap with backend data later
const UNIVERSITIES = [
  {
    id: 1,
    name: "Dhaka University",
    type: "public",
    unit: "Ka Unit (Science)",
    groups: ["Science"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 8.00 (no GPA below 3.5 in either)",
      requiredSubjects: ["Physics", "Chemistry", "Mathematics/Biology"],
    },
    examPattern: {
      mode: "MCQ",
      duration: "60 minutes",
      totalMarks: 100,
      negativeMarking: "-0.25 per wrong answer",
      questionCount: 100,
    },
    markDistribution: [
      { subject: "Physics", marks: 20 },
      { subject: "Chemistry", marks: 20 },
      { subject: "Mathematics", marks: 20 },
      { subject: "Biology", marks: 20 },
      { subject: "English", marks: 10 },
      { subject: "General Knowledge", marks: 10 },
    ],
  },
  {
    id: 2,
    name: "BUET",
    type: "public",
    unit: "Undergraduate Admission",
    groups: ["Science"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 9.00 (GPA 5.00 preferred in Math/Physics/Chemistry)",
      requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
    },
    examPattern: {
      mode: "Written (short + analytical)",
      duration: "150 minutes (2 sittings)",
      totalMarks: 400,
      negativeMarking: "None on written; MCQ pre-screening has negative marking",
      questionCount: "Pre-screening MCQ + written analytical",
    },
    markDistribution: [
      { subject: "Mathematics", marks: 125 },
      { subject: "Physics", marks: 112.5 },
      { subject: "Chemistry", marks: 112.5 },
      { subject: "English", marks: 50 },
    ],
  },
  {
    id: 3,
    name: "Jahangirnagar University",
    type: "public",
    unit: "A Unit (Science)",
    groups: ["Science"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 8.00",
      requiredSubjects: ["Physics", "Chemistry", "Mathematics/Biology"],
    },
    examPattern: {
      mode: "MCQ",
      duration: "45 minutes",
      totalMarks: 80,
      negativeMarking: "-0.20 per wrong answer",
      questionCount: 80,
    },
    markDistribution: [
      { subject: "Physics", marks: 20 },
      { subject: "Chemistry", marks: 20 },
      { subject: "Mathematics/Biology", marks: 20 },
      { subject: "English", marks: 10 },
      { subject: "General Knowledge", marks: 10 },
    ],
  },
  {
    id: 4,
    name: "Chittagong University",
    type: "public",
    unit: "B Unit (Arts & Social Science)",
    groups: ["Arts", "Commerce"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 6.50",
      requiredSubjects: ["Any HSC group accepted"],
    },
    examPattern: {
      mode: "MCQ",
      duration: "45 minutes",
      totalMarks: 100,
      negativeMarking: "-0.25 per wrong answer",
      questionCount: 100,
    },
    markDistribution: [
      { subject: "Bangla", marks: 25 },
      { subject: "English", marks: 25 },
      { subject: "General Knowledge", marks: 30 },
      { subject: "Analytical Ability", marks: 20 },
    ],
  },
  {
    id: 5,
    name: "Ahsanullah University of Science and Technology",
    type: "private",
    unit: "B.Sc in CSE / EEE / Others",
    groups: ["Science"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 6.00 (varies slightly by program)",
      requiredSubjects: ["Physics", "Chemistry", "Mathematics"],
    },
    examPattern: {
      mode: "MCQ + Written (Math)",
      duration: "60 minutes",
      totalMarks: 100,
      negativeMarking: "None",
      questionCount: "50 MCQ + short written math",
    },
    markDistribution: [
      { subject: "Mathematics", marks: 40 },
      { subject: "Physics", marks: 20 },
      { subject: "Chemistry", marks: 20 },
      { subject: "English", marks: 20 },
    ],
  },
  {
    id: 6,
    name: "North South University",
    type: "private",
    unit: "Undergraduate Programs",
    groups: ["Science", "Commerce", "Arts"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 6.00 (program dependent, some need ≥7.00)",
      requiredSubjects: ["Depends on program — Science required for Engineering/CS"],
    },
    examPattern: {
      mode: "No admission test — GPA + SAT/university-specific screening (optional)",
      duration: "N/A",
      totalMarks: "N/A",
      negativeMarking: "N/A",
      questionCount: "N/A",
    },
    markDistribution: [
      { subject: "SSC GPA (weighted)", marks: 50 },
      { subject: "HSC GPA (weighted)", marks: 50 },
    ],
  },
  {
    id: 7,
    name: "BRAC University",
    type: "private",
    unit: "Undergraduate Programs",
    groups: ["Science", "Commerce", "Arts"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 6.00",
      requiredSubjects: ["Depends on program — Science required for Engineering/CS"],
    },
    examPattern: {
      mode: "Written English + Math screening for select programs",
      duration: "60 minutes",
      totalMarks: 100,
      negativeMarking: "None",
      questionCount: "Varies by program",
    },
    markDistribution: [
      { subject: "English", marks: 50 },
      { subject: "Mathematics/Analytical", marks: 50 },
    ],
  },
  {
    id: 8,
    name: "Rajshahi University",
    type: "public",
    unit: "Unit A (Science)",
    groups: ["Science"],
    eligibility: {
      minGPA: "SSC + HSC combined ≥ 8.00",
      requiredSubjects: ["Physics", "Chemistry", "Mathematics/Biology"],
    },
    examPattern: {
      mode: "MCQ",
      duration: "60 minutes",
      totalMarks: 100,
      negativeMarking: "-0.25 per wrong answer",
      questionCount: 100,
    },
    markDistribution: [
      { subject: "Physics", marks: 25 },
      { subject: "Chemistry", marks: 25 },
      { subject: "Mathematics/Biology", marks: 25 },
      { subject: "English & GK", marks: 25 },
    ],
  },
];

const GROUP_STYLES = {
  Science: "bg-blue-100 text-blue-800",
  Commerce: "bg-emerald-100 text-emerald-800",
  Arts: "bg-purple-100 text-purple-800",
};

const TYPE_BADGE = {
  public: "bg-gold/20 text-amber-700 border border-gold/40",
  private: "bg-indigo-100 text-indigo-800",
};

function MaxMark({ dist }) {
  const total = dist.reduce((sum, d) => sum + (typeof d.marks === "number" ? d.marks : 0), 0);
  return total;
}

export default function Assessment() {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(UNIVERSITIES[0].id);

  const filtered = useMemo(() => {
    return UNIVERSITIES.filter((u) => {
      const matchesQuery =
        query.trim() === "" ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.unit.toLowerCase().includes(query.toLowerCase());
      const matchesGroup = groupFilter === "all" || u.groups.includes(groupFilter);
      return matchesQuery && matchesGroup;
    });
  }, [query, groupFilter]);

  return (
    <section className="min-h-screen bg-stone-200">
      {/* Hero-style banner matching theme */}
      <div className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-light pt-24 sm:pt-28 md:pt-32 pb-12 px-4">
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full border border-gold/20"></div>
        <div className="pointer-events-none absolute top-10 right-5 h-52 w-52 rounded-full border border-gold/15"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-slate-800 bg-gold rounded-full px-4 py-1.5 mb-4">
            Exam Guide
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-800 mb-3">
            Assessment &amp; Mark Distribution
          </h1>
          <p className="text-amber-700 max-w-2xl mx-auto lg:text-lg">
            Compare eligibility, subject-wise mark breakdown, and exam
            patterns across public and private universities in Bangladesh —
            know exactly what to prepare for, before you apply.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 pb-16">
        {/* Search + group filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search university or unit..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["all", "Science", "Commerce", "Arts"].map((g) => (
              <button
                key={g}
                onClick={() => setGroupFilter(g)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  groupFilter === g
                    ? "bg-gold text-slate-800 border-gold"
                    : "bg-white text-slate-600 border-slate-300 hover:border-gold/50"
                }`}
              >
                {g === "all" ? "All Groups" : g}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Showing {filtered.length} of {UNIVERSITIES.length} universities
        </p>

        {/* Accordion list */}
        <div className="space-y-4">
          {filtered.map((u) => {
            const isOpen = expandedId === u.id;
            return (
              <div
                key={u.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                {/* Header — always visible */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : u.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-stone-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base md:text-lg font-semibold text-slate-800">
                        {u.name}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded capitalize ${TYPE_BADGE[u.type]}`}>
                        {u.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{u.unit}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {u.groups.map((g) => (
                        <span key={g} className={`text-xs font-medium px-2 py-0.5 rounded-full ${GROUP_STYLES[g]}`}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      {/* Eligibility */}
                      <div>
                        <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-2">
                          <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Eligibility
                        </h4>
                        <p className="text-sm text-slate-600 mb-2">{u.eligibility.minGPA}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {u.eligibility.requiredSubjects.map((s) => (
                            <span
                              key={s}
                              className="text-xs bg-stone-100 text-slate-600 px-2 py-1 rounded border border-slate-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Exam pattern */}
                      <div>
                        <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-2">
                          <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          Exam Pattern
                        </h4>
                        <dl className="text-sm text-slate-600 space-y-1.5">
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-400">Mode</dt>
                            <dd className="text-right font-medium text-slate-700">{u.examPattern.mode}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-400">Duration</dt>
                            <dd className="text-right font-medium text-slate-700">{u.examPattern.duration}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-400">Total Marks</dt>
                            <dd className="text-right font-medium text-slate-700">{u.examPattern.totalMarks}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-400">Questions</dt>
                            <dd className="text-right font-medium text-slate-700">{u.examPattern.questionCount}</dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-slate-400">Negative Marking</dt>
                            <dd className="text-right font-medium text-slate-700">{u.examPattern.negativeMarking}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Mark distribution bars */}
                    <div className="mt-6">
                      <h4 className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 mb-3">
                        <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 19V6l7-3v13M9 19l-6-2V9l6-3m0 13l7 3V9m0 10l6-3V4l-6-2" />
                        </svg>
                        Mark Distribution
                      </h4>
                      <div className="space-y-2.5">
                        {u.markDistribution.map((d) => {
                          const max = MaxMark({ dist: u.markDistribution });
                          const pct = max > 0 ? (d.marks / max) * 100 : 0;
                          return (
                            <div key={d.subject}>
                              <div className="flex justify-between text-xs text-slate-600 mb-1">
                                <span>{d.subject}</span>
                                <span className="font-medium">{d.marks} marks</span>
                              </div>
                              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gold rounded-full"
                                  style={{ width: `${pct}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 bg-white rounded-xl">
              No universities match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
