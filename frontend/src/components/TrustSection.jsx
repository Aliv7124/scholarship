import React from "react";

const features = [
  {
    icon: "✓",
    title: "Verified Scholarships",
    description:
      "Every scholarship is reviewed and verified before being added to our platform.",
  },
  {
    icon: "✨",
    title: "AI-Powered Matching",
    description:
      "Our AI analyzes your profile and finds opportunities you're most likely to qualify for.",
  },
  {
    icon: "🔔",
    title: "Deadline Alerts",
    description:
      "Never miss an opportunity with personalized reminders before scholarship deadlines.",
  },
  {
    icon: "🔒",
    title: "Your Data Is Safe",
    description:
      "Your personal information is protected with industry-standard security.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-lg-5">

        {/* Heading */}
        <div className="text-center mb-5">
          <div
            className="text-primary fw-bold mb-2"
            style={{
              fontSize: "11px",
              letterSpacing: "1.5px",
            }}
          >
            WHY SCHOLARSHIPHUB
          </div>

          <h2 className="fw-bold mb-2">
            Your Scholarship Journey,
            <br className="d-md-none" /> Simplified
          </h2>

          <p
            className="text-secondary mx-auto mb-0"
            style={{ maxWidth: "600px" }}
          >
            Everything you need to discover, compare and apply
            for scholarships in one place.
          </p>
        </div>

        {/* Features */}
        <div className="row g-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="col-12 col-md-6 col-lg-3"
            >
              <div className="text-center px-3">

                {/* Icon */}
                <div
                  className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "58px",
                    height: "58px",
                    fontSize: "22px",
                  }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h5 className="fw-bold mb-2">
                  {feature.title}
                </h5>

                {/* Description */}
                <p className="text-secondary small mb-0">
                  {feature.description}
                </p>

              </div>
            </div>
          ))}

        </div>

        {/* Trust Statistics */}
        <div className="row justify-content-center mt-5 pt-4 border-top">

          <div className="col-6 col-md-3 text-center mb-4 mb-md-0">
            <div className="fw-bold fs-4 text-dark">
              4.9/5
            </div>
            <small className="text-secondary">
              Student Rating
            </small>
          </div>

          <div className="col-6 col-md-3 text-center mb-4 mb-md-0">
            <div className="fw-bold fs-4 text-dark">
              2.1M+
            </div>
            <small className="text-secondary">
              Students Helped
            </small>
          </div>

          <div className="col-6 col-md-3 text-center">
            <div className="fw-bold fs-4 text-dark">
              47K+
            </div>
            <small className="text-secondary">
              Scholarships
            </small>
          </div>

          <div className="col-6 col-md-3 text-center">
            <div className="fw-bold fs-4 text-dark">
              156
            </div>
            <small className="text-secondary">
              Countries
            </small>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;