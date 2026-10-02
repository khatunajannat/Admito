import { useEffect, useState } from "react";
import { adminApi } from "./adminApi";

const emptyForm = {
  name: "",
  type: "public",
  unit: "",
  groups: "",
  minGPA: "",
  requiredSubjects: "",
  mode: "MCQ",
  duration: "",
  totalMarks: "",
  negativeMarking: "",
  questionCount: "",
  markDistribution: [{ subject: "", marks: "" }],
};

export default function AssessmentManager() {
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAssessments();
      setAssessments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkChange = (index, field, value) => {
    const updated = [...form.markDistribution];
    updated[index][field] = value;

    setForm({
      ...form,
      markDistribution: updated,
    });
  };

  const addSubject = () => {
    setForm({
      ...form,
      markDistribution: [
        ...form.markDistribution,
        { subject: "", marks: "" },
      ],
    });
  };

  const removeSubject = (index) => {
    const updated = form.markDistribution.filter(
      (_, i) => i !== index
    );

    setForm({
      ...form,
      markDistribution:
        updated.length > 0
          ? updated
          : [{ subject: "", marks: "" }],
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: form.name,
        type: form.type,
        unit: form.unit,

        groups: form.groups
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        eligibility: {
          minGPA: form.minGPA,
          requiredSubjects: form.requiredSubjects
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },

        examPattern: {
          mode: form.mode,
          duration: form.duration,
          totalMarks: Number(form.totalMarks),
          negativeMarking: form.negativeMarking,
          questionCount: Number(form.questionCount),
        },

        markDistribution: form.markDistribution
          .filter((item) => item.subject.trim() !== "")
          .map((item) => ({
            subject: item.subject,
            marks: Number(item.marks),
          })),
      };

      if (editingId) {
        await adminApi.updateAssessment(editingId, payload);
      } else {
        await adminApi.createAssessment(payload);
      }

      resetForm();
      await loadAssessments();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (assessment) => {
    setEditingId(assessment._id);

    setForm({
      name: assessment.name || "",
      type: assessment.type || "public",
      unit: assessment.unit || "",
      groups: (assessment.groups || []).join(", "),

      minGPA: assessment.eligibility?.minGPA || "",
      requiredSubjects: (
        assessment.eligibility?.requiredSubjects || []
      ).join(", "),

      mode: assessment.examPattern?.mode || "MCQ",
      duration: assessment.examPattern?.duration || "",
      totalMarks: assessment.examPattern?.totalMarks || "",
      negativeMarking:
        assessment.examPattern?.negativeMarking || "",
      questionCount:
        assessment.examPattern?.questionCount || "",

      markDistribution:
        assessment.markDistribution?.length > 0
          ? assessment.markDistribution.map((item) => ({
              subject: item.subject || "",
              marks: item.marks ?? "",
            }))
          : [{ subject: "", marks: "" }],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assessment?")) return;

    try {
      setError("");
      await adminApi.deleteAssessment(id);

      if (editingId === id) {
        resetForm();
      }

      await loadAssessments();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {editingId ? "Edit Assessment" : "Add Assessment"}
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Basic Information */}
          <div>
            <h3 className="font-medium text-slate-700 mb-3">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="University"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                required
              />

              <Select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                options={["public", "private"]}
              />

              <Input
                label="Groups"
                name="groups"
                value={form.groups}
                onChange={handleChange}
                placeholder="Science, Commerce, Arts"
                required
              />
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="font-medium text-slate-700 mb-3">
              Eligibility
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Minimum GPA"
                name="minGPA"
                value={form.minGPA}
                onChange={handleChange}
                placeholder="SSC + HSC combined ≥ 8.00"
                required
              />

              <Input
                label="Required Subjects"
                name="requiredSubjects"
                value={form.requiredSubjects}
                onChange={handleChange}
                placeholder="Physics, Chemistry, Mathematics"
                required
              />
            </div>
          </div>

          {/* Exam Pattern */}
          <div>
            <h3 className="font-medium text-slate-700 mb-3">
              Exam Pattern
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Mode"
                name="mode"
                value={form.mode}
                onChange={handleChange}
                required
              />

              <Input
                label="Duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="60 minutes"
                required
              />

              <Input
                label="Total Marks"
                name="totalMarks"
                type="number"
                value={form.totalMarks}
                onChange={handleChange}
                required
              />

              <Input
                label="Question Count"
                name="questionCount"
                type="number"
                value={form.questionCount}
                onChange={handleChange}
                required
              />

              <Input
                label="Negative Marking"
                name="negativeMarking"
                value={form.negativeMarking}
                onChange={handleChange}
                placeholder="-0.25 per wrong answer"
                required
              />
            </div>
          </div>

          {/* Mark Distribution */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-slate-700">
                Mark Distribution
              </h3>

              <button
                type="button"
                onClick={addSubject}
                className="text-sm font-medium text-[#805827] hover:underline"
              >
                + Add Subject
              </button>
            </div>

            <div className="space-y-3">
              {form.markDistribution.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-end"
                >
                  <div className="flex-1">
                    <label className="block text-sm text-slate-600 mb-1">
                      Subject
                    </label>

                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) =>
                        handleMarkChange(
                          index,
                          "subject",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#805827]"
                      placeholder="Physics"
                      required
                    />
                  </div>

                  <div className="w-32">
                    <label className="block text-sm text-slate-600 mb-1">
                      Marks
                    </label>

                    <input
                      type="number"
                      value={item.marks}
                      onChange={(e) =>
                        handleMarkChange(
                          index,
                          "marks",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#805827]"
                      placeholder="20"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#805827] px-5 py-2 text-white font-medium hover:bg-[#6d4b21] disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Assessment"
                : "Add Assessment"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-300 px-5 py-2 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Assessments */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Existing Assessments
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : assessments.length === 0 ? (
          <p className="text-slate-500">
            No assessments added yet.
          </p>
        ) : (
          <div className="space-y-3">
            {assessments.map((assessment) => (
              <div
                key={assessment._id}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
              >
                <div>
                  <h3 className="font-medium text-slate-800">
                    {assessment.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {assessment.unit} ·{" "}
                    {assessment.type}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(assessment)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(assessment._id)
                    }
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#805827]"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#805827]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}