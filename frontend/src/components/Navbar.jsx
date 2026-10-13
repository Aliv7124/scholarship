import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container py-2">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
        >
          {/* Logo Icon */}
          <div
            className="d-flex align-items-center justify-content-center rounded-3 text-white fw-bold"
            style={{
              width: "42px",
              height: "42px",
              background: "linear-gradient(135deg, #4b3cc4, #6957e8)",
              fontSize: "25px",
            }}
          >
            ↑
          </div>

          {/* Logo Text */}
          <div className="lh-1">
            <div
              className="fw-bold"
              style={{
                color: "#18233c",
                fontSize: "17px",
              }}
            >
              ScholarshipHub
            </div>

            <small
              className="fw-bold"
              style={{
                color: "#5141d9",
                fontSize: "11px",
              }}
            >
              AI
            </small>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-4">

            {/* Home */}
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link fw-semibold"
                style={{ color: "#53617a" }}
              >
                Home
              </Link>
            </li>

            {/* Find Scholarships */}
            <li className="nav-item">
              <Link
                to="/scholarships"
                className="nav-link fw-semibold"
                style={{ color: "#53617a" }}
              >
                Find Scholarships
              </Link>
            </li>

            {/* AI Matcher */}
            <li className="nav-item">
              <Link
                to="/ai-matcher"
                className="nav-link fw-semibold"
                style={{ color: "#53617a" }}
              >
                AI Matcher
              </Link>
            </li>

            {/* Categories */}
            <li className="nav-item">
              <Link
                to="/categories"
                className="nav-link fw-semibold"
                style={{ color: "#53617a" }}
              >
                Categories
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/account" className="nav-link fw-semibold" style={{ color: "#53617a" }}>
                Student Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin" className="nav-link fw-semibold" style={{ color: "#53617a" }}>
                Admin
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">

            {/* Notification */}
            <button
              type="button"
              className="btn bg-white border rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "42px",
                height: "42px",
              }}
            >
              <span style={{ fontSize: "18px" }}>
                🔔
              </span>
            </button>

            {/* Get AI Matches */}
            <Link
              to="/ai-matcher"
              className="btn text-white fw-bold rounded-3 px-4 py-2"
              style={{
                backgroundColor: "#5141d9",
                fontSize: "14px",
              }}
            >
              ✨ Get AI Matches →
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
