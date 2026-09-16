import { useEffect, useState } from "react";

// A small generic CRUD manager: fields drive both the form and the table.
// field: { name, label, type: "text"|"date"|"select", options?: string[], required? }
export default function ResourceManager({
  title,
  fields,
  idKey = "_id",
  fetchAll,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const emptyForm = () =>
    Object.fromEntries(fields.map((f) => [f.name, ""]));

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAll();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    setForm(emptyForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (item) => {
    setEditingId(item[idKey]);
    const next = {};
    fields.forEach((f) => {
      const v = item[f.name];
      next[f.name] = f.type === "date" && v ? v.slice(0, 10) : v ?? "";
    });
    setForm(next);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      // Send null instead of "" for optional date fields (e.g. examDate)
      fields.forEach((f) => {
        if (f.type === "date" && !f.required && payload[f.name] === "") {
          payload[f.name] = null;
        }
      });

      if (editingId) {
        await onUpdate(editingId, payload);
      } else {
        await onCreate(payload);
      }
      cancelEdit();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry? This can't be undone.")) return;
    setError("");
    try {
      await onDelete(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">{error}</p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 border-b border-slate-100 pb-6"
      >
        {fields.map((f) => (
          <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              {f.label}
            </label>
            {f.type === "select" ? (
              <select
                value={form[f.name] ?? ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                required={f.required}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#805827] focus:border-[#805827] p-2"
              >
                <option value="" disabled>
                  Select {f.label.toLowerCase()}
                </option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type}
                value={form[f.name] ?? ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                required={f.required}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#805827] focus:border-[#805827] p-2"
              />
            )}
          </div>
        ))}

        <div className="sm:col-span-2 flex gap-2 mt-1">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#805827] text-white text-sm font-medium px-4 py-2 hover:bg-[#6b4a20] transition disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Update entry" : "Add entry"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-slate-300 text-slate-600 text-sm font-medium px-4 py-2 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      {loading ? (
        <p className="text-sm text-slate-400 py-6 text-center">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">No entries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                {fields.map((f) => (
                  <th key={f.name} className="pb-2 pr-4 font-medium">
                    {f.label}
                  </th>
                ))}
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item[idKey]} className="border-b border-slate-50">
                  {fields.map((f) => (
                    <td key={f.name} className="py-2 pr-4 text-slate-700">
                      {f.type === "date"
                        ? item[f.name]
                          ? new Date(item[f.name]).toLocaleDateString("en-GB")
                          : "—"
                        : String(item[f.name] ?? "—")}
                    </td>
                  ))}
                  <td className="py-2 whitespace-nowrap">
                    <button
                      onClick={() => startEdit(item)}
                      className="text-[#805827] hover:underline mr-3 text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item[idKey])}
                      className="text-red-600 hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
