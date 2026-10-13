import React from "react";

const scholarships = [
  {
    days: "43d left",
    title: "NSP Central Sector Scheme for College Students",
    organization: "Ministry of Education, Govt. of India",
    amount: "₹12,000/yr",
    level: "Undergraduate",
    country: "India",
    match: "87%",
    matchClass: "text-success",
    badgeClass: "text-success bg-success-subtle",
  },
  {
    days: "12d left",
    title: "Post Matric Scholarship for OBC Students",
    organization: "Ministry of Social Justice & Empowerment",
    amount: "₹15,000/yr",
    level: "Post-Matric",
    country: "India",
    match: "73%",
    matchClass: "text-warning",
    badgeClass: "text-warning bg-warning-subtle",
  },
];

const ClosingSoon = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-4">

        {/* Heading */}
        <div className="d-flex justify-content-between align-items-end mb-4">

          <div>
            <div
              className="fw-bold text-warning mb-2"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
              }}
            >
              ⚠ ACT NOW
            </div>

            <h2 className="fw-bold mb-1">
              Closing Soon
            </h2>

            <p className="text-secondary mb-0">
              These scholarships are accepting applications
              for a limited time.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-link text-primary text-decoration-none fw-semibold p-0"
          >
            View all
            <span className="ms-2">›</span>
          </button>

        </div>

        {/* Cards */}
        <div className="row g-4">

          {scholarships.map((scholarship) => (
            <div
              className="col-12 col-md-6"
              key={scholarship.title}
            >

              <div className="card border-0 shadow-sm rounded-4 h-100">

                <div className="card-body p-4">

                  {/* Top */}
                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <span
                      className={`badge rounded-pill fw-normal ${scholarship.badgeClass}`}
                    >
                      ◷ {scholarship.days}
                    </span>

                    <button
                      type="button"
                      className="btn btn-sm border-0 bg-transparent p-0 text-secondary"
                    >
                      ♡
                    </button>

                  </div>

                  {/* Title */}
                  <h5 className="fw-bold lh-sm mb-2">
                    {scholarship.title}
                  </h5>

                  {/* Organization */}
                  <p className="text-secondary small mb-4">
                    {scholarship.organization}
                  </p>

                  {/* Amount / Match */}
                  <div className="d-flex justify-content-between align-items-center mb-3">

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

                      <div className="fw-bold fs-5">
                        {scholarship.amount}
                      </div>

                      <small className="text-secondary">
                        {scholarship.level} · {scholarship.country}
                      </small>
                    </div>

                    <div className="text-center">

                      <div
                        className="text-secondary"
                        style={{ fontSize: "10px" }}
                      >
                        AI Match
                      </div>

                      <div
                        className={`fw-bold fs-5 ${scholarship.matchClass}`}
                      >
                        {scholarship.match}
                      </div>

                    </div>

                  </div>

                  {/* Apply button */}
                  <button
                    type="button"
                    className="btn text-white fw-semibold rounded-pill w-100 py-2"
                    style={{
                      backgroundColor: "#5840d8",
                    }}
                  >
                    Apply Before Deadline
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ClosingSoon;