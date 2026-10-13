import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, post } from "../lib/api";

const scholarships = [
  {
    category: "Government",
    status: "Open",
    type: "Stipend",
    title: "Post Matric Scholarship for SC Students",
    organization: "Ministry of Social Justice & Empowerment",
    amount: "₹23,000/year",
    match: "85%",
    location: "India",
    level: "Post-Matric",
    applicants: "310,000 applicants",
    field: "All Fields",
    tags: ["SC Category", "Need-Based", "Post-Matric"],
    deadline: "166d left — Dec 31, 2026",
  },
  {
    category: "Government",
    status: "Open",
    type: "Fully Funded",
    title: "Maulana Azad National Fellowship",
    organization: "Ministry of Minority Affairs, Govt. of India",
    amount: "₹31,000/month",
    match: "65%",
    location: "India",
    level: "PhD / M.Phil",
    applicants: "38,000 applicants",
    field: "All Fields",
    tags: ["Minority", "Research", "PhD"],
    deadline: "75d left — Oct 1, 2026",
  },
  {
    category: "Private",
    status: "Upcoming",
    type: "Fully Funded",
    title: "Tata Scholarship for Cornell University",
    organization: "Tata Education & Development Trust",
    amount: "₹42,00,000/year",
    match: "81%",
    location: "India / USA",
    level: "Undergraduate",
    applicants: "5,200 applicants",
    field: "All Fields",
    tags: ["Tata", "International", "Fully Funded"],
    deadline: "286d left — Apr 30, 2027",
  },
  {
    category: "Private",
    status: "Upcoming",
    type: "Stipend",
    title: "Aditya Birla Scholarships",
    organization: "Aditya Birla Group",
    amount: "₹65,000/year",
    match: "88%",
    location: "India",
    level: "Undergraduate / Post...",
    applicants: "9,100 applicants",
    field: "Engineering, Law, MBA...",
    tags: ["Corporate", "Merit-Based", "IIT/IIM"],
    deadline: "181d left — Jan 15, 2027",
  },
  {
    category: "Private",
    status: "Upcoming",
    type: "Stipend",
    title: "Sitaram Jindal Foundation Scholarship",
    organization: "Sitaram Jindal Foundation",
    amount: "₹24,000/year",
    match: "76%",
    location: "India",
    level: "Undergraduate / Post...",
    applicants: "29,000 applicants",
    field: "All Fields",
    tags: ["Need-Based", "All India", "Private"],
    deadline: "256d left — Mar 31, 2027",
  },
  {
    category: "Government",
    status: "Open",
    type: "Stipend",
    title: "CSIR Junior Research Fellowship (JRF)",
    organization: "Council of Scientific & Industrial Research",
    amount: "₹37,000/month",
    match: "91%",
    location: "India",
    level: "PhD / Research",
    applicants: "142,000 applicants",
    field: "Science & Technology",
    tags: ["CSIR", "Research", "Science"],
    deadline: "92d left — Oct 18, 2026",
  },
  {
    category: "Government",
    status: "Open",
    type: "Stipend",
    title: "National Scholarship Portal (NSP) — Central Sector Scheme",
    organization: "Ministry of Education, Govt. of India",
    amount: "₹12,000/year",
    match: "94%",
    location: "India",
    level: "Undergraduate",
    applicants: "420,000 applicants",
    field: "All Fields",
    tags: ["Central Govt", "Merit-Based", "All Fields"],
    deadline: "105d left — Oct 31, 2026",
  },
  {
    category: "Government",
    status: "Closing Soon",
    type: "Stipend",
    title: "PM Scholarship Scheme for Central Armed Police Forces",
    organization: "Ministry of Home Affairs, Govt. of India",
    amount: "₹36,000/year",
    match: "87%",
    location: "India",
    level: "Undergraduate / Post...",
    applicants: "125,000 applicants",
    field: "Defence",
    tags: ["Defence", "CAPF", "Fully Funded"],
    deadline: "43d left — Aug 30, 2026",
  },
  {
    category: "Government",
    status: "Open",
    type: "Stipend",
    title: "Inspire Scholarship (SHE)",
    organization: "Department of Science & Technology, Govt. of India",
    amount: "₹80,000/year",
    match: "79%",
    location: "India",
    level: "Undergraduate (Science)",
    applicants: "89,000 applicants",
    field: "Natural & Basic Sciences",
    tags: ["Science", "DST", "Merit-Based"],
    deadline: "110d left — Nov 5, 2026",
  },
];

const ScholarshipCard = ({ scholarship }) => {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const toggleSaved = async () => {
    try {
      const { scholarships: matches } = await api(`/scholarships?q=${encodeURIComponent(scholarship.title)}`);
      const item = matches.find((match) => match.title === scholarship.title) || matches[0];
      if (!item) return navigate(`/scholarships?q=${encodeURIComponent(scholarship.title)}`);
      const result = await post(`/scholarships/${item.id}/save`, {});
      setSaved(result.saved);
    } catch {
      navigate(`/scholarships?q=${encodeURIComponent(scholarship.title)}`);
    }
  };

  const matchNumber = parseInt(scholarship.match);

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">

        {/* Top badges */}
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div className="d-flex flex-wrap gap-2">

            <span className="badge text-primary bg-primary-subtle fw-normal">
              {scholarship.category}
            </span>

            <span
              className={`badge fw-normal ${
                scholarship.status === "Closing Soon"
                  ? "text-warning bg-warning-subtle"
                  : scholarship.status === "Upcoming"
                  ? "text-primary bg-primary-subtle"
                  : "text-success bg-success-subtle"
              }`}
            >
              {scholarship.status}
            </span>

            <span className="badge text-primary bg-primary-subtle fw-normal">
              {scholarship.type}
            </span>

          </div>

          <button
            type="button"
            className="btn btn-sm border-0 bg-transparent p-0"
            onClick={toggleSaved}
            title="Save scholarship"
          >
            <span
              className={saved ? "text-danger" : "text-secondary"}
              style={{ fontSize: "20px" }}
            >
              {saved ? "♥" : "♡"}
            </span>
          </button>
        </div>

        {/* Title */}
        <h5 className="fw-bold mt-3 mb-2 lh-sm">
          {scholarship.title}
        </h5>

        {/* Organization */}
        <p className="text-secondary small mb-4">
          {scholarship.organization}
        </p>

        {/* Award + AI Match */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <div
              className="text-secondary fw-semibold"
              style={{
                fontSize: "10px",
                letterSpacing: "0.5px",
              }}
            >
              AWARD AMOUNT
            </div>

            <div className="fw-bold fs-5 text-dark">
              {scholarship.amount}
            </div>
          </div>

          <div
            className={`text-center rounded-4 px-3 py-2 ${
              matchNumber >= 80
                ? "bg-success-subtle"
                : "bg-warning-subtle"
            }`}
          >
            <div
              className="text-secondary"
              style={{ fontSize: "10px" }}
            >
              AI Match
            </div>

            <div
              className={`fw-bold ${
                matchNumber >= 80
                  ? "text-success"
                  : "text-warning"
              }`}
            >
              {scholarship.match}
            </div>
          </div>
        </div>

        {/* Scholarship information */}
        <div className="row g-2 mb-3">

          <div className="col-6">
            <small className="text-secondary d-block text-truncate">
              ◎ {scholarship.location}
            </small>
          </div>

          <div className="col-6">
            <small className="text-secondary d-block text-truncate">
              ☆ {scholarship.level}
            </small>
          </div>

          <div className="col-6">
            <small className="text-secondary d-block text-truncate">
              ♧ {scholarship.applicants}
            </small>
          </div>

          <div className="col-6">
            <small className="text-secondary d-block text-truncate">
              ⚡ {scholarship.field}
            </small>
          </div>

        </div>

        {/* Tags */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {scholarship.tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-light text-secondary fw-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="d-flex justify-content-between align-items-center gap-2">

          <small className="text-secondary text-nowrap">
            ◷ {scholarship.deadline}
          </small>

          <button
            type="button"
            className="btn btn-sm text-white rounded-pill px-3 fw-semibold text-nowrap"
            onClick={() => navigate(`/scholarships?q=${encodeURIComponent(scholarship.title)}`)}
            style={{
              backgroundColor: "#5840d8",
            }}
          >
            View Details
          </button>

        </div>

      </div>
    </div>
  );
};

const FeaturedScholarships = () => {
  const [activeTab, setActiveTab] = useState("Featured");

  const tabs = [
    "Featured",
    "Newly Added",
    "Closing Soon",
    "High Match",
  ];

  const getScholarships = () => {
    if (activeTab === "Closing Soon") {
      return scholarships.filter(
        (item) => item.status === "Closing Soon"
      );
    }

    if (activeTab === "High Match") {
      return scholarships.filter(
        (item) => parseInt(item.match) >= 85
      );
    }

    if (activeTab === "Newly Added") {
      return scholarships.slice(0, 6);
    }

    return scholarships;
  };

  const visibleScholarships = getScholarships();

  return (
    <section className="py-5 bg-light">

      <div className="container py-lg-4">

        {/* Section heading */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">

          <div>
            <div
              className="text-primary fw-bold"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
              }}
            >
              ✨ AI-CURATED
            </div>

            <h2 className="fw-bold mt-2 mb-1">
              Featured Scholarships
            </h2>

            <p className="text-secondary mb-0">
              Ranked by match score for your profile
            </p>
          </div>

          <button
            type="button"
            className="btn btn-link text-primary text-decoration-none fw-semibold p-0"
          >
            View all scholarships →
          </button>

        </div>

        {/* Tabs */}
        <div className="bg-secondary-subtle rounded-4 p-1 mb-4">

          <div className="row g-1">

            {tabs.map((tab) => (
              <div
                key={tab}
                className="col-6 col-md-3"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`btn w-100 rounded-3 ${
                    activeTab === tab
                      ? "bg-white shadow-sm fw-semibold"
                      : "text-secondary"
                  }`}
                >
                  {tab}
                </button>
              </div>
            ))}

          </div>
        </div>

        {/* Scholarship Cards */}
        <div className="row g-4">

          {visibleScholarships.map((scholarship) => (
            <div
              key={scholarship.title}
              className="col-12 col-lg-6"
            >
              <ScholarshipCard
                scholarship={scholarship}
              />
            </div>
          ))}

        </div>

        {/* Empty state */}
        {visibleScholarships.length === 0 && (
          <div className="text-center py-5">
            <div className="display-5 mb-3">
              🔍
            </div>

            <h5 className="fw-bold">
              No scholarships found
            </h5>

            <p className="text-secondary">
              Try another category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedScholarships;
