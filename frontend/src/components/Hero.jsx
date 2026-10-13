import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filters = [
    "Fully Funded",
    "Merit-Based",
    "Need-Based",
    "STEM",
    "Arts",
    "Women Only",
    "Government",
    "PhD",
  ];

  return (
    <section
      className="text-white text-center py-5"
      style={{
        background:
          "linear-gradient(135deg, #30276f 0%, #4434c7 55%, #5540d9 100%)",
      }}
    >
      <div className="container py-lg-5">

        {/* AI Badge */}
        <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill border border-light border-opacity-25 bg-white bg-opacity-10 mb-4">
          <span>✨</span>

          <span className="small fw-semibold">
            AI-Powered Scholarship Matching
          </span>
        </div>

        {/* Heading */}
        <h1
          className="fw-bold display-3 lh-sm mb-4"
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          Find Scholarships That{" "}
          <span style={{ color: "#ff9f0a" }}>
            Actually Match
          </span>{" "}
          Your Profile
        </h1>

        {/* Subtitle */}
        <p
          className="lead text-white-50 mb-4"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          47,832 scholarships. AI eligibility scoring. One platform.
        </p>

        {/* Search */}
        <form
          className="input-group mx-auto mb-4"
          onSubmit={(event) => { event.preventDefault(); navigate(`/scholarships?q=${encodeURIComponent(search)}`); }}
          style={{
            maxWidth: "900px",
            height: "64px",
          }}
        >
          <span className="input-group-text bg-white border-0 ps-4">
            🔍
          </span>

          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Search by scholarship name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              fontSize: "16px",
            }}
          />

          {/* Filter */}
          <button
            className="btn bg-white text-secondary border-start"
            type="button"
          >
            ☷
          </button>

          {/* Search Button */}
          <button
            className="btn text-white px-4"
            type="submit"
            style={{
              backgroundColor: "#6947e8",
            }}
          >
            🔍
          </button>
        </form>

        {/* Filter Chips */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => navigate(`/scholarships?filter=${encodeURIComponent(filter)}`)}
              className="btn btn-sm rounded-pill text-white px-3 py-2"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Optional AI CTA */}
        <div className="mt-4">
          <Link
            to="/ai-matcher"
            className="text-white text-decoration-none small fw-semibold"
          >
            ✨ Let AI find scholarships for me →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;
