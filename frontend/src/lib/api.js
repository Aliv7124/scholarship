export async function api(path, options = {}) {
  const studentToken = !path.startsWith("/admin/") && localStorage.getItem("studentToken");
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "content-type": "application/json", ...(studentToken ? { authorization: `Bearer ${studentToken}` } : {}), ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed. Please try again.");
  return data;
}

export const post = (path, body, options = {}) => api(path, { ...options, method: "POST", body: JSON.stringify(body) });
