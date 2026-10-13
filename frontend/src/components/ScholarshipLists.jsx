import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Government Scholarships",
    description: "Scholarships offered by central and state governments.",
    count: "12,480 scholarships",
    icon: "🏛️",
  },
  {
    title: "Private Scholarships",
    description: "Funding opportunities from companies and foundations.",
    count: "8,920 scholarships",
    icon: "🏢",
  },
  {
    title: "International Scholarships",
    description: "Study abroad scholarships from universities worldwide.",
    count: "6,340 scholarships",
    icon: "🌎",
  },
  {
    title: "Merit-Based Scholarships",
    description: "Awards based on academic achievement and excellence.",
    count: "9,870 scholarships",
    icon: "🏆",
  },
  {
    title: "Need-Based Scholarships",
    description: "Financial assistance for students who need support.",
    count: "7,650 scholarships",
    icon: "💰",
  },
  {
    title: "Women Scholarships",
    description: "Scholarships designed to support women in education.",
    count: "4,230 scholarships",
    icon: "👩‍🎓",
  },
  {
    title: "Minority Scholarships",
    description: "Education funding for eligible minority communities.",
    count: "3,780 scholarships",
    icon: "🎓",
  },
  {
    title: "Research Scholarships",
    description: "Funding for research, PhD and academic programs.",
    count: "5,120 scholarships",
    icon: "🔬",
  },
];

const ScholarshipLists = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-lg-4">

        {/* Heading */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">

          <div>
            <div
              className="text-primary fw-bold mb-2"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
              }}
            >
              EXPLORE
            </div>

            <h2 className="fw-bold mb-1">
              Scholarship Categories
            </h2>

            <p className="text-secondary mb-0">
              Explore scholarships based on your needs and goals.
            </p>
          </div>

          <Link
            to="/categories"
            className="btn btn-link text-primary text-decoration-none fw-semibold p-0"
          >
            View all categories →
          </Link>

        </div>

        {/* Category Cards */}
        <div className="row g-4">

          {categories.map((category) => (
            <div
              key={category.title}
              className="col-12 col-md-6 col-lg-3"
            >
              <Link
                to="/scholarships"
                className="text-decoration-none"
              >
                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    {/* Icon */}
                    <div
                      className="rounded-3 bg-primary-subtle d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "48px",
                        height: "48px",
                        fontSize: "22px",
                      }}
                    >
                      {category.icon}
                    </div>

                    {/* Title */}
                    <h5 className="fw-bold text-dark mb-2">
                      {category.title}
                    </h5>

                    {/* Description */}
                    <p className="text-secondary small mb-3">
                      {category.description}
                    </p>

                    {/* Count */}
                    <div className="d-flex justify-content-between align-items-center">

                      <span className="text-primary small fw-semibold">
                        {category.count}
                      </span>

                      <span className="text-primary">
                        →
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ScholarshipLists;