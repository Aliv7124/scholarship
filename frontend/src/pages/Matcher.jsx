import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { post } from "../lib/api";

const loadSavedMatches = () => {
  try {
    const matches = JSON.parse(sessionStorage.getItem("matcherResults") || "[]");
    return Array.isArray(matches) ? matches : [];
  } catch { return []; }
};

export default function Matcher() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ field: "", level: "", marks: "", marksScale: "percentage", category: "", state: "", familyIncome: "" });
  const [matches, setMatches] = useState(loadSavedMatches);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMatches([]);
    sessionStorage.removeItem("matcherResults");
    try {
      const result = await post("/match", profile);
      setMatches(result.matches);
      sessionStorage.setItem("matcherResults", JSON.stringify(result.matches));
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const apply = async (scholarship) => {
    if (!localStorage.getItem("studentToken")) {
      sessionStorage.setItem("matcherResults", JSON.stringify(matches));
      navigate(`/account?next=${encodeURIComponent("/ai-matcher")}`);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { application } = await post(`/scholarships/${encodeURIComponent(scholarship.id)}/apply`, {});
      sessionStorage.removeItem("matcherResults");
      window.location.assign(application.applicationUrl);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return <><Navbar /><main className="container py-5"><div className="mx-auto" style={{ maxWidth: 850 }}>
    <h1 className="fw-bold">Scholarship matcher</h1>
    <p className="text-secondary">Share your academic profile to get AI-ranked scholarship suggestions. Marks and income help estimate fit, but do not guarantee eligibility.</p>
    <form className="card border-0 shadow-sm rounded-4 p-4 mb-4" onSubmit={submit}>
      <div className="row g-3">
        <label className="col-md-6">Field of study<input className="form-control mt-2" name="field" placeholder="e.g. Computer Science" value={profile.field} onChange={update} required maxLength={120} /></label>
        <label className="col-md-6">Study level<select className="form-select mt-2" name="level" value={profile.level} onChange={update} required><option value="">Choose level</option><option>High School</option><option>Undergraduate</option><option>Post-Matric</option><option>Postgraduate</option><option>PhD</option><option>Research</option></select></label>
        <label className="col-md-6">Your latest marks<input className="form-control mt-2" name="marks" type="number" min="0" max={profile.marksScale === "cgpa10" ? "10" : "100"} step="any" placeholder={profile.marksScale === "cgpa10" ? "e.g. 8.2" : "e.g. 85"} value={profile.marks} onChange={update} required /></label>
        <label className="col-md-6">Marks format<select className="form-select mt-2" name="marksScale" value={profile.marksScale} onChange={update}><option value="percentage">Percentage (out of 100)</option><option value="cgpa10">CGPA (out of 10)</option></select></label>
        <label className="col-md-6">Scholarship category (optional)<select className="form-select mt-2" name="category" value={profile.category} onChange={update}><option value="">Any category</option><option>Government</option><option>Private</option><option>Merit-Based</option><option>Need-Based</option></select></label>
        <label className="col-md-6">State or territory (optional)<input className="form-control mt-2" name="state" placeholder="e.g. Maharashtra" value={profile.state} onChange={update} maxLength={100} /></label>
        <label className="col-md-6">Annual family income (optional)<input className="form-control mt-2" name="familyIncome" type="number" min="0" step="1" placeholder="e.g. 250000" value={profile.familyIncome} onChange={update} /></label>
      </div>
      <button className="btn btn-primary rounded-pill mt-4 align-self-start" disabled={busy}>{busy ? "AI is reviewing your profile?" : "Find my matches"}</button>
    </form>
    {error && <div className="alert alert-danger">{error}</div>}
    {matches.length > 0 && <><h2 className="h4 fw-bold mb-3">Your suggested scholarships</h2>{matches.map((item) => <article className="card border-0 shadow-sm rounded-4 mb-3" key={item.id}><div className="card-body"><div className="d-flex justify-content-between align-items-start gap-3"><div><h5 className="fw-bold mb-1">{item.title}</h5><div className="text-secondary small">{item.organization} ? {item.level} ? {item.field}</div></div><span className="badge text-bg-success fs-6">{item.match} fit</span></div><p className="mt-3">{item.reason}</p><button type="button" className="btn btn-primary rounded-pill" disabled={busy} onClick={() => apply(item)}>Apply now</button></div></article>)}</>}
  </div></main><Footer /></>;
}
