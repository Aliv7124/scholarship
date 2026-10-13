import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api, post } from "../lib/api";

export default function Scholarships() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState(params.get("q") || "");
  const [filter, setFilter] = useState(params.get("filter") || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(() => new Set());
  const [compareIds, setCompareIds] = useState([]);
  useEffect(() => {
    api(`/scholarships?q=${encodeURIComponent(params.get("q") || "")}&filter=${encodeURIComponent(params.get("filter") || "")}`)
      .then(({ scholarships }) => setItems(scholarships)).catch((e) => setError(e.message));
  }, [params]);
  const search = (e) => { e.preventDefault(); setCompareIds([]); setParams({ q: query, filter }); };
  const toggleSave = async (item) => { try { const result = await post(`/scholarships/${item.id}/save`, {}); setSaved((prev) => { const next = new Set(prev); result.saved ? next.add(item.id) : next.delete(item.id); return next; }); } catch (e) { setError(e.message); } };
  const apply = async (item) => { if (!localStorage.getItem("studentToken")) { navigate(`/account?next=${encodeURIComponent("/scholarships")}`); return; } const target = window.open("about:blank", "_blank", "noopener,noreferrer"); try { const { application } = await post(`/scholarships/${item.id}/apply`, {}); if (target) target.location.href = application.applicationUrl; } catch (e) { target?.close(); setError(e.message); } };
  const toggleCompare = (item) => {
    if (compareIds.includes(item.id)) {
      setCompareIds((current) => current.filter((id) => id !== item.id));
      return;
    }
    if (compareIds.length >= 3) { setError("You can compare up to 3 scholarships at a time."); return; }
    setError("");
    setCompareIds((current) => [...current, item.id]);
  };
  const compared = items.filter((item) => compareIds.includes(item.id));
  const bestMatch = compared.reduce((best, item) => Number.parseInt(item.match, 10) > Number.parseInt(best?.match || "0", 10) ? item : best, null);
  return <><Navbar /><main className="container py-5"><div className="d-flex justify-content-between align-items-center mb-4"><div><h1 className="fw-bold">Find scholarships</h1><p className="text-secondary">Search, compare up to three options, and choose what fits your goals.</p></div><Link className="btn btn-outline-primary rounded-pill" to="/">Home</Link></div><form className="row g-2 mb-4" onSubmit={search}><div className="col-md-7"><input className="form-control form-control-lg" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Scholarship, organization, field…" /></div><div className="col-md-3"><select className="form-select form-select-lg" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">All types</option><option>Government</option><option>Private</option><option>Merit-Based</option><option>Need-Based</option><option>STEM</option><option>PhD</option></select></div><div className="col-md-2"><button className="btn btn-primary btn-lg w-100">Search</button></div></form>{error && <div className="alert alert-warning">{error}</div>}{compareIds.length > 0 && <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-primary-subtle rounded-4 p-3 mb-4"><span className="fw-semibold">{compareIds.length} of 3 scholarships selected to compare</span><button className="btn btn-primary rounded-pill" type="button" onClick={() => document.getElementById("scholarship-comparison")?.scrollIntoView({ behavior: "smooth" })} disabled={compared.length < 2}>Compare selected</button></div>}<div className="row g-3">{items.map((s) => <div className="col-12 col-lg-6" key={s.id}><article className="card h-100 border-0 shadow-sm rounded-4"><div className="card-body p-4"><div className="d-flex justify-content-between align-items-center"><span className="badge text-bg-light">{s.category} · {s.status}</span><button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => toggleSave(s)}>{saved.has(s.id) ? "Saved ♥" : "Save ♡"}</button></div><h5 className="fw-bold mt-3">{s.title}</h5><p className="text-secondary">{s.organization}</p><div className="d-flex justify-content-between"><strong>{s.amount}</strong><span className="text-success fw-bold">{s.match} match</span></div><div className="small text-secondary mt-3">{s.level} · {s.field} · Deadline {s.deadline}</div><div className="d-flex flex-wrap gap-2 mt-3">{s.tags.map((tag) => <span className="badge text-bg-light fw-normal" key={tag}>{tag}</span>)}</div><div className="d-flex flex-wrap gap-2 mt-4"><button className={`btn rounded-pill ${compareIds.includes(s.id) ? "btn-outline-primary" : "btn-outline-secondary"}`} type="button" onClick={() => toggleCompare(s)}>{compareIds.includes(s.id) ? "✓ Added to compare" : "Compare"}</button><button className="btn btn-primary rounded-pill" type="button" onClick={() => apply(s)}>Start application ↗</button></div></div></article></div>)}</div>{!items.length && !error && <p className="text-center text-secondary py-5">No matching scholarships. Try a broader search.</p>}{compared.length >= 2 && <section id="scholarship-comparison" className="mt-5"><h2 className="fw-bold">Compare scholarships</h2><p className="text-secondary">Review funding, eligibility, and deadlines side by side. The highest match score is highlighted; consider the other details against your needs too.</p>{bestMatch && <div className="alert alert-success"><strong>Highest match:</strong> {bestMatch.title} at {bestMatch.match} for your current profile.</div>}<div className="table-responsive"><table className="table table-bordered align-middle bg-white"><thead><tr><th scope="col">Details</th>{compared.map((item) => <th scope="col" key={item.id}>{item.title}</th>)}</tr></thead><tbody>{[["Award amount", (item) => item.amount], ["Match score", (item) => item.match], ["Study level", (item) => item.level], ["Field", (item) => item.field], ["Provider", (item) => item.organization], ["Status", (item) => item.status], ["Deadline", (item) => item.deadline]].map(([label, getValue]) => <tr key={label}><th scope="row">{label}</th>{compared.map((item) => <td key={item.id} className={label === "Match score" && item.id === bestMatch?.id ? "table-success fw-bold" : ""}>{getValue(item)}</td>)}</tr>)}<tr><th scope="row">Action</th>{compared.map((item) => <td key={item.id}><button className="btn btn-sm btn-primary" type="button" onClick={() => apply(item)}>Choose & apply</button></td>)}</tr></tbody></table></div></section>}</main><Footer /></>;
}
