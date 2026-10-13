import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api, post } from "../lib/api";

export default function Account() {
  const [account, setAccount] = useState(() => { try { return JSON.parse(localStorage.getItem("studentAccount") || "null"); } catch { return null; } });
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  useEffect(() => {
    if (!localStorage.getItem("studentToken")) return;
    api("/auth/me").then(({ student }) => { setAccount(student); localStorage.setItem("studentAccount", JSON.stringify(student)); }).catch(() => { localStorage.removeItem("studentToken"); localStorage.removeItem("studentAccount"); setAccount(null); });
  }, []);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const result = await post(registering ? "/auth/register" : "/auth/login", form);
      localStorage.setItem("studentToken", result.token);
      localStorage.setItem("studentAccount", JSON.stringify(result.student));
      const next = params.get("next");
      navigate(next?.startsWith("/") && !next.startsWith("//") ? next : "/scholarships");
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const logout = async () => {
    try { await post("/auth/logout", {}); } catch { /* Clear the local session even if the server session already ended. */ }
    localStorage.removeItem("studentToken"); localStorage.removeItem("studentAccount"); setAccount(null);
  };
  if (account && localStorage.getItem("studentToken")) return <><Navbar /><main className="container py-5"><div className="mx-auto" style={{ maxWidth: 520 }}><div className="card border-0 shadow-sm rounded-4 p-4"><h1 className="h3 fw-bold">Welcome, {account.name}</h1><p className="text-secondary">Signed in as {account.email}</p><p>Your student account will be attached to scholarship applications you start.</p><div className="d-flex gap-2"><Link className="btn btn-primary rounded-pill" to="/scholarships">Browse scholarships</Link><button className="btn btn-outline-secondary rounded-pill" onClick={logout}>Sign out</button></div></div></div></main><Footer /></>;
  return <><Navbar /><main className="container py-5"><div className="mx-auto" style={{ maxWidth: 520 }}><h1 className="fw-bold">{registering ? "Create your student account" : "Student sign in"}</h1><p className="text-secondary">Sign in to save your name and email with scholarship applications.</p><form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={submit}>{registering && <label className="mb-3">Full name<input className="form-control mt-2" name="name" autoComplete="name" minLength="2" maxLength="100" required value={form.name} onChange={update} /></label>}<label className="mb-3">Email<input className="form-control mt-2" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} /></label><label>Password<input className="form-control mt-2" name="password" type="password" autoComplete={registering ? "new-password" : "current-password"} minLength="8" required value={form.password} onChange={update} /></label>{error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}<button className="btn btn-primary rounded-pill mt-4 align-self-start" disabled={busy}>{busy ? "Please wait…" : registering ? "Create account" : "Sign in"}</button></form><button type="button" className="btn btn-link px-0 mt-3" onClick={() => { setRegistering(!registering); setError(""); }}>{registering ? "Already have an account? Sign in" : "New student? Create an account"}</button><p className="small text-secondary mt-3">Your password is stored as a secure hash. Use the application provider’s official site to complete each scholarship application.</p><Link to="/scholarships">Browse scholarships</Link></div></main><Footer /></>;
}
