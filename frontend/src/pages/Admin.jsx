import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api, post } from "../lib/api";

const emptyScholarship = { title: "", organization: "", amount: "", category: "Government", status: "Open", type: "Stipend", level: "", field: "", location: "India", tags: "", deadline: "", applicationUrl: "" };
const emptyDashboard = { students: [], applications: [], scholarships: [] };
const navigation = [
  { id: "overview", label: "Dashboard", href: "/admin" },
  { id: "students", label: "Students", href: "/admin/students" },
  { id: "applications", label: "Applications", href: "/admin/applications" },
  { id: "scholarships", label: "Scholarships", href: "/admin/scholarships" },
];
const dateLabel = (value) => value ? new Date(value).toLocaleDateString() : "?";

export default function Admin() {
  const location = useLocation();
  const section = location.pathname.split("/")[2] || "overview";
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [password, setPassword] = useState("");
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [form, setForm] = useState(emptyScholarship);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadDashboard = useCallback(async (sessionToken) => {
    try {
      setDashboard(await api("/admin/dashboard", { headers: { authorization: `Bearer ${sessionToken}` } }));
      setError("");
    } catch (err) {
      if (err.message.toLowerCase().includes("session expired")) {
        localStorage.removeItem("adminToken");
        setToken("");
      }
      setError(err.message);
    }
  }, []);

  useEffect(() => { if (token) loadDashboard(token); }, [token, loadDashboard]);

  const login = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await post("/admin/login", { password });
      localStorage.setItem("adminToken", result.token);
      setToken(result.token);
      setPassword("");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const logout = async () => {
    try { await post("/admin/logout", {}, { headers: { authorization: `Bearer ${token}` } }); } catch { /* Clear the local session even if it already expired. */ }
    localStorage.removeItem("adminToken");
    setToken("");
    setDashboard(emptyDashboard);
  };

  const deleteRecord = async (collection, record, label) => {
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await api(`/admin/${collection}/${encodeURIComponent(record.id)}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } });
      setMessage(`${label} deleted.`);
      await loadDashboard(token);
    } catch (err) {
      if (err.message.toLowerCase().includes("session expired")) {
        localStorage.removeItem("adminToken");
        setToken("");
        setDashboard(emptyDashboard);
        setError("Your admin session expired. Sign in again, then retry the delete.");
      } else {
        setError(err.message);
      }
    }
    finally { setBusy(false); }
  };

  const addScholarship = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const result = await post("/admin/scholarships", form, { headers: { authorization: `Bearer ${token}` } });
      setMessage(`${result.scholarship.title} was added to the catalog.`);
      setForm(emptyScholarship);
      await loadDashboard(token);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const table = (headers, rows, emptyText) => <>
    <div className="table-responsive"><table className="table align-middle mb-0"><thead><tr>{headers.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows}</tbody></table></div>
    {rows.length === 0 && <p className="text-secondary mt-3 mb-0">{emptyText}</p>}
  </>;

  const deleteButton = (collection, record, label) => <button type="button" className="btn btn-sm btn-outline-danger" disabled={busy} onClick={() => deleteRecord(collection, record, label)}>Delete</button>;

  const pageTitle = navigation.find((item) => item.id === section)?.label || "Dashboard";
  let pageContent;
  if (section === "students") {
    pageContent = <section className="card border-0 shadow-sm rounded-4 p-4"><h2 className="h4 fw-bold">Student accounts</h2><p className="text-secondary">Registered accounts and their join dates.</p>{table(["Name", "Email", "Joined", "Actions"], dashboard.students.map((student) => <tr key={student.id}><td>{student.name}</td><td>{student.email}</td><td>{dateLabel(student.createdAt)}</td><td>{deleteButton("students", student, `student ${student.name}`)}</td></tr>), "No student accounts yet.")}</section>;
  } else if (section === "applications") {
    pageContent = <section className="card border-0 shadow-sm rounded-4 p-4"><h2 className="h4 fw-bold">Student applications</h2><p className="text-secondary">Applications started through the scholarship pages.</p>{table(["Student", "Email", "Scholarship", "Started", "Status", "Actions"], dashboard.applications.map((application) => <tr key={application.id}><td>{application.name || "Legacy application"}</td><td>{application.email}</td><td>{application.title}</td><td>{dateLabel(application.createdAt)}</td><td>{application.status}</td><td>{deleteButton("applications", application, "this application")}</td></tr>), "No applications yet.")}</section>;
  } else if (section === "scholarships") {
    pageContent = <>
      <section className="card border-0 shadow-sm rounded-4 p-4 mb-4"><h2 className="h4 fw-bold">Scholarship catalog</h2><p className="text-secondary">Live records used by the frontend scholarship pages.</p>{table(["Name", "Organization", "Award", "Status", "Deadline", "Application", "Actions"], dashboard.scholarships.map((scholarship) => <tr key={scholarship.id}><td>{scholarship.title}</td><td>{scholarship.organization}</td><td>{scholarship.amount}</td><td>{scholarship.status}</td><td>{scholarship.deadline}</td><td><a href={scholarship.applicationUrl} target="_blank" rel="noreferrer">Open link</a></td><td>{deleteButton("scholarships", scholarship, `scholarship ${scholarship.title}`)}</td></tr>), "No scholarship records found.")}</section>
      <section className="card border-0 shadow-sm rounded-4 p-4"><h2 className="h4 fw-bold">Add a scholarship</h2><p className="text-secondary">New listings are saved in MongoDB and appear in the frontend catalog.</p><form onSubmit={addScholarship}><div className="row g-3">{[["title", "Scholarship name"], ["organization", "Organization"], ["amount", "Award amount"], ["level", "Study level"], ["field", "Field of study"], ["location", "Location"], ["deadline", "Deadline"]].map(([name, label]) => <label className="col-md-6" key={name}>{label}<input className="form-control mt-2" name={name} type={name === "deadline" ? "date" : "text"} required={name !== "location"} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} /></label>)}<label className="col-md-6">Category<select className="form-select mt-2" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option>Government</option><option>Private</option><option>Merit-Based</option><option>Need-Based</option></select></label><label className="col-md-6">Status<select className="form-select mt-2" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Open</option><option>Upcoming</option></select></label><label className="col-md-6">Award type<input className="form-control mt-2" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} /></label><label className="col-md-6">Tags (comma-separated)<input className="form-control mt-2" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} /></label><label className="col-12">Application URL<input className="form-control mt-2" type="url" placeholder="https://example.org/apply" required value={form.applicationUrl} onChange={(event) => setForm({ ...form, applicationUrl: event.target.value })} /></label></div><button className="btn btn-primary rounded-pill mt-4" disabled={busy}>{busy ? "Saving?" : "Add scholarship"}</button></form></section>
    </>;
  } else {
    pageContent = <><div className="row g-3 mb-4">{[["Students", dashboard.students.length, "/admin/students"], ["Applications", dashboard.applications.length, "/admin/applications"], ["Scholarships", dashboard.scholarships.length, "/admin/scholarships"]].map(([label, count, href]) => <div className="col-md-4" key={href}><Link to={href} className="card border-0 shadow-sm rounded-4 p-4 h-100 text-decoration-none text-dark"><div className="text-secondary">{label}</div><div className="display-6 fw-bold">{count}</div><span className="small text-primary">Manage {label.toLowerCase()} ?</span></Link></div>)}</div><section className="card border-0 shadow-sm rounded-4 p-4"><h2 className="h4 fw-bold">Recent applications</h2>{table(["Student", "Scholarship", "Started", "Status"], dashboard.applications.slice(0, 5).map((application) => <tr key={application.id}><td>{application.name || application.email}</td><td>{application.title}</td><td>{dateLabel(application.createdAt)}</td><td>{application.status}</td></tr>), "No applications yet.")}</section></>;
  }

  return <><Navbar /><main className="container py-5"><div className="d-flex justify-content-between align-items-center mb-4"><div><h1 className="fw-bold">Admin dashboard</h1><p className="text-secondary mb-0">Manage students, applications, and scholarship listings.</p></div>{token && <button className="btn btn-outline-secondary" onClick={logout}>Sign out</button>}</div>{error && <div className="alert alert-danger">{error}</div>}{message && <div className="alert alert-success">{message}</div>}{!token ? <form className="card border-0 shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: 480 }} onSubmit={login}><h2 className="h5 fw-bold">Admin sign in</h2><label>Admin password<input className="form-control mt-2" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="btn btn-primary rounded-pill mt-4 align-self-start" disabled={busy}>{busy ? "Signing in?" : "Sign in"}</button></form> : <div className="row g-4"><aside className="col-12 col-md-3 col-lg-2"><nav className="list-group shadow-sm rounded-4 overflow-hidden">{navigation.map((item) => <Link key={item.id} to={item.href} className={`list-group-item list-group-item-action ${section === item.id ? "active" : ""}`}>{item.label}</Link>)}</nav></aside><section className="col-12 col-md-9 col-lg-10"><div className="d-flex justify-content-between align-items-center mb-3"><h2 className="h3 fw-bold mb-0">{pageTitle}</h2><button className="btn btn-sm btn-outline-secondary" onClick={() => loadDashboard(token)}>Refresh</button></div>{pageContent}</section></div>}</main><Footer /></>;
}
