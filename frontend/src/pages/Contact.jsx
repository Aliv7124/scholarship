import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { post } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setStatus("");
    try { const result = await post("/contact", form); setStatus(result.message); setError(false); setForm({ name: "", email: "", message: "" }); }
    catch (e) { setStatus(e.message); setError(true); }
  };
  return <><Navbar /><main className="container py-5"><div className="mx-auto" style={{ maxWidth: 680 }}><h1 className="fw-bold">Contact us</h1><p className="text-secondary">Send a message to the ScholarshipHub team.</p><form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={submit}><label className="mb-3">Name<input className="form-control mt-2" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label className="mb-3">Email<input type="email" className="form-control mt-2" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Message<textarea className="form-control mt-2" rows="5" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label><button className="btn btn-primary rounded-pill align-self-start mt-4">Send message</button>{status && <div className={`alert mt-3 mb-0 ${error ? "alert-danger" : "alert-success"}`}>{status}</div>}</form></div></main><Footer /></>;
}
