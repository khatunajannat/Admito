const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173/api";

function getToken() {
  return localStorage.getItem("admito_token");
}

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

export const adminApi = {
  login: (email, password) =>
    request("/users/login", { method: "POST", body: { email, password } }),

  // Circulars
  getCirculars: () => request("/circulars"),
  createCircular: (payload) => request("/circulars", { method: "POST", body: payload }),
  updateCircular: (id, payload) => request(`/circulars/${id}`, { method: "PUT", body: payload }),
  deleteCircular: (id) => request(`/circulars/${id}`, { method: "DELETE" }),

  // Important Dates
  getImportantDates: () => request("/important-dates"),
  createImportantDate: (payload) => request("/important-dates", { method: "POST", body: payload }),
  updateImportantDate: (id, payload) => request(`/important-dates/${id}`, { method: "PUT", body: payload }),
  deleteImportantDate: (id) => request(`/important-dates/${id}`, { method: "DELETE" }),
};

export { getToken };
