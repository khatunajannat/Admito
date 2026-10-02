import { useEffect, useMemo, useState } from "react";

const GROUP_STYLES = {
  Science: "bg-blue-100 text-blue-700",
  Commerce: "bg-green-100 text-green-700",
  Arts: "bg-purple-100 text-purple-700",
};

const TYPE_BADGE = {
  public: "bg-blue-100 text-blue-700",
  private: "bg-amber-100 text-amber-700",
};

function MaxMark({ dist }) {
  return (dist || []).reduce(
    (sum, item) => sum + Number(item.marks || 0),
    0
  );
}

export default function Assessment() {
  const [universities, setUniversities] = useState([]);
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        setError("");

        const baseUrl =
          import.meta.env.VITE_API_URL || "http://localhost:4000/api";

        const response = await fetch(`${baseUrl}/assessments`);

        if (!response.ok) {
          throw new Error("Failed to load assessments");
        }

        const data = await response.json();
        setUniversities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim();

    return universities.filter((university) => {
      const matchesSearch =
        !search ||
        university.name?.toLowerCase().includes(search) ||
        university.unit?.toLowerCase().includes(search);

      const matchesGroup =
        groupFilter === "All" ||
        university.groups?.includes(groupFilter);

      return matchesSearch && matchesGroup;
    });
  }, [universities, query, groupFilter]);

  const groups = useMemo(() => {
    const allGroups = universities.flatMap(
      (university) => university.groups || []
    );

    return ["All", ...new Set(allGroups)];
  }, [universities]);

  return (
    <section className="min-h-screen bg-stone-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
            Admission Assessment
          </h1>

          <p className="mt-3 text-slate-500">
            Explore university admission requirements and exam patterns.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search university or unit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#805827]"
          />
        </div>

        {/* Group Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setGroupFilter(group)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                groupFilter === group
                  ? "bg-[#805827] text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-slate-500">
            Loading assessments...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="max-w-xl mx-auto rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No assessments found.
          </div>
        )}

        {/* Count */}
        {!loading && !error && filtered.length > 0 && (
          <p className="text-sm text-slate-500 mb-4">
            Showing {filtered.length} assessment
            {filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Assessment List */}
        {!loading && !error && (
          <div className="space-y-4">
            {filtered.map((university) => {
              const id = university._id;
              const isExpanded = expandedId === id;

              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  {/* Main Row */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : id)
                    }
                    className="w-full text-left p-5 md:p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h2 className="text-xl font-semibold text-slate-800">
                            {university.name}
                          </h2>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              TYPE_BADGE[university.type] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {university.type}
                          </span>
                        </div>

                        <p className="text-slate-500">
                          {university.unit}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {(university.groups || []).map((group) => (
                            <span
                              key={group}
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                GROUP_STYLES[group] ||
                                "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-slate-400 text-xl">
                        {isExpanded ? "−" : "+"}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 px-5 py-6 md:px-6 space-y-7">

                      {/* Eligibility */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">
                          Eligibility
                        </h3>

                        <div className="space-y-2 text-slate-600">
                          <p>
                            <span className="font-medium text-slate-700">
                              Minimum GPA:
                            </span>{" "}
                            {university.eligibility?.minGPA || "N/A"}
                          </p>

                          <div>
                            <span className="font-medium text-slate-700">
                              Required Subjects:
                            </span>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {(
                                university.eligibility
                                  ?.requiredSubjects || []
                              ).map((subject) => (
                                <span
                                  key={subject}
                                  className="rounded-full bg-stone-100 px-3 py-1 text-sm text-slate-600"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Exam Pattern */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">
                          Exam Pattern
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="rounded-xl bg-stone-100 p-4">
                            <p className="text-xs text-slate-500">
                              Mode
                            </p>
                            <p className="font-medium text-slate-800 mt-1">
                              {university.examPattern?.mode || "N/A"}
                            </p>
                          </div>

                          <div className="rounded-xl bg-stone-100 p-4">
                            <p className="text-xs text-slate-500">
                              Duration
                            </p>
                            <p className="font-medium text-slate-800 mt-1">
                              {university.examPattern?.duration || "N/A"}
                            </p>
                          </div>

                          <div className="rounded-xl bg-stone-100 p-4">
                            <p className="text-xs text-slate-500">
                              Total Marks
                            </p>
                            <p className="font-medium text-slate-800 mt-1">
                              {university.examPattern?.totalMarks ??
                                "N/A"}
                            </p>
                          </div>

                          <div className="rounded-xl bg-stone-100 p-4">
                            <p className="text-xs text-slate-500">
                              Questions
                            </p>
                            <p className="font-medium text-slate-800 mt-1">
                              {university.examPattern?.questionCount ??
                                "N/A"}
                            </p>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-slate-500">
                          <span className="font-medium text-slate-700">
                            Negative Marking:
                          </span>{" "}
                          {university.examPattern?.negativeMarking ||
                            "None"}
                        </p>
                      </div>

                      {/* Mark Distribution */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-slate-800">
                            Mark Distribution
                          </h3>

                          <span className="text-sm text-slate-500">
                            Total:{" "}
                            <span className="font-medium text-slate-700">
                              {MaxMark(university.markDistribution)}
                            </span>
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-200">
                                <th className="text-left py-3 text-slate-500 font-medium">
                                  Subject
                                </th>
                                <th className="text-right py-3 text-slate-500 font-medium">
                                  Marks
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {(university.markDistribution || []).map(
                                (item, index) => (
                                  <tr
                                    key={index}
                                    className="border-b border-slate-100 last:border-0"
                                  >
                                    <td className="py-3 text-slate-700">
                                      {item.subject}
                                    </td>

                                    <td className="py-3 text-right font-medium text-slate-800">
                                      {item.marks}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
