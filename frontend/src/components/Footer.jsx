import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { post } from "../lib/api";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const subscribe = async (event) => {
    event.preventDefault();
    try { const result = await post("/subscribe", { email }); setMessage(result.message); setEmail(""); }
    catch (error) { setMessage(error.message); }
  };
  return (
    <footer className="bg-dark text-white">

      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-5">

          {/* Brand */}
          <div className="col-12 col-lg-4">

            <Link
              to="/"
              className="text-decoration-none text-white d-inline-flex align-items-center gap-2 mb-3"
            >
              <span
                className="rounded-3 d-flex align-items-center justify-content-center bg-primary"
                style={{
                  width: "38px",
                  height: "38px",
                  fontSize: "18px",
                }}
              >
                🎓
              </span>

              <span className="fw-bold fs-5">
                ScholarshipHub
              </span>
            </Link>

            <p className="text-white-50 small mb-4">
              Your trusted platform for discovering scholarships,
              financial aid and educational opportunities worldwide.
            </p>

            <div className="d-flex gap-2">

              <button
                type="button"
                className="btn btn-outline-light rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                }}
              >
                f
              </button>

              <button
                type="button"
                className="btn btn-outline-light rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                }}
              >
                𝕏
              </button>

              <button
                type="button"
                className="btn btn-outline-light rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                }}
              >
                in
              </button>

              <button
                type="button"
                className="btn btn-outline-light rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                }}
              >
                ▶
              </button>

            </div>

          </div>

          {/* Scholarships */}
          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="fw-bold mb-3">
              Scholarships
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-2">
                <Link
                  to="/scholarships"
                  className="text-white-50 text-decoration-none small"
                >
                  Find Scholarships
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/scholarships"
                  className="text-white-50 text-decoration-none small"
                >
                  Government
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/scholarships"
                  className="text-white-50 text-decoration-none small"
                >
                  Private
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/scholarships"
                  className="text-white-50 text-decoration-none small"
                >
                  International
                </Link>
              </li>

              <li>
                <Link
                  to="/scholarships"
                  className="text-white-50 text-decoration-none small"
                >
                  Closing Soon
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}
          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="fw-bold mb-3">
              Resources
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-2">
                <Link
                  to="/blog"
                  className="text-white-50 text-decoration-none small"
                >
                  Scholarship Guides
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/blog"
                  className="text-white-50 text-decoration-none small"
                >
                  Application Tips
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/ai-matcher"
                  className="text-white-50 text-decoration-none small"
                >
                  AI Matcher
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/categories"
                  className="text-white-50 text-decoration-none small"
                >
                  Browse by Field
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-white-50 text-decoration-none small"
                >
                  FAQ
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}
          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="fw-bold mb-3">
              Company
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none small"
                >
                  About Us
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-white-50 text-decoration-none small"
                >
                  Contact
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/partners"
                  className="text-white-50 text-decoration-none small"
                >
                  Partners
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/careers"
                  className="text-white-50 text-decoration-none small"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/press"
                  className="text-white-50 text-decoration-none small"
                >
                  Press
                </Link>
              </li>

            </ul>

          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-6 col-lg-2">

            <h6 className="fw-bold mb-3">
              Stay Updated
            </h6>

            <p className="text-white-50 small">
              Get new scholarship alerts directly in your inbox.
            </p>

            <form className="input-group" onSubmit={subscribe}>

              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
              >
                →
              </button>

            </form>
            {message && <small className="d-block mt-2 text-white-50">{message}</small>}

          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-top border-secondary">

        <div className="container py-3">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

            <small className="text-white-50">
              © 2026 ScholarshipHub. All rights reserved.
            </small>

            <div className="d-flex gap-3">

              <Link
                to="/privacy"
                className="text-white-50 text-decoration-none small"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-white-50 text-decoration-none small"
              >
                Terms of Service
              </Link>

              <Link
                to="/cookies"
                className="text-white-50 text-decoration-none small"
              >
                Cookie Policy
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
