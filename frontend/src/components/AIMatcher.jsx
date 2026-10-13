import React from "react";
import { Link } from "react-router-dom";

const AIMatcher = () => {
  const features = [
    "AI calculates your eligibility score for every scholarship",
    "Personalized recommendations based on your academic profile",
    "Instant alerts when new matching scholarships are added",
    "Track all your applications from one dashboard",
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-5">

        <div
          className="rounded-5 p-4 p-md-5 text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #30246f 0%, #4b36c9 55%, #6040e5 100%)",
          }}
        >
          <div className="row align-items-center g-5">

            {/* Left Content */}
            <div className="col-12 col-lg-7">

              {/* Label */}
              <div
                className="d-inline-flex align-items-center gap-2 mb-3"
                style={{
                  color: "#ffb21c",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  fontWeight: "700",
                }}
              >
                <span>✨</span>
                AI SCHOLARSHIP MATCHER
              </div>

              {/* Heading */}
              <h2 className="display-6 fw-bold lh-sm mb-3">
                Let AI Find Scholarships
                <br />
                You Actually Qualify For
              </h2>

              {/* Description */}
              <p
                className="text-white-50 mb-4"
                style={{ maxWidth: "600px" }}
              >
                Create your free profile in 3 minutes. Our AI
                analyzes 47,832 scholarships and ranks them by
                your eligibility score — saving you weeks of
                manual searching.
              </p>

              {/* Features */}
              <div className="d-flex flex-column gap-3 mb-4">

                {features.map((feature) => (
                  <div
                    key={feature}
                    className="d-flex align-items-start gap-3"
                  >
                    <span className="text-success">
                      ✓
                    </span>

                    <span className="text-white-50">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              {/* Button */}
              <Link
                to="/ai-matcher"
                className="btn fw-bold rounded-pill px-4 py-3"
                style={{
                  backgroundColor: "#ff9f0a",
                  color: "#fff",
                }}
              >
                ✨ Get My AI Matches →
              </Link>

              <div className="small text-white-50 mt-3">
                Free forever · No credit card required
              </div>

            </div>

            {/* Right Stats Card */}
            <div className="col-12 col-lg-5">

              <div className="d-flex justify-content-center">

                <div
                  className="rounded-5 p-4 p-md-5 text-center border border-white border-opacity-25"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(10px)",
                    maxWidth: "330px",
                    width: "100%",
                  }}
                >

                  {/* Accuracy */}
                  <div className="mb-4">

                    <div className="display-4 fw-bold">
                      94%
                    </div>

                    <div className="text-white-50 small">
                      Average match accuracy
                    </div>

                  </div>

                  <hr className="border-white opacity-25" />

                  {/* Time */}
                  <div className="mt-4">

                    <div
                      className="display-5 fw-bold"
                      style={{
                        color: "#ff9f0a",
                      }}
                    >
                      3 min
                    </div>

                    <div className="text-white-50 small">
                      Profile setup time
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AIMatcher;