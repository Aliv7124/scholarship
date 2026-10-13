import React from "react";
import { Link } from "react-router-dom";

const guides = [
  {
    category: "SCHOLARSHIP GUIDE",
    title: "How to Write a Winning Scholarship Essay",
    description:
      "Learn the key strategies that can make your scholarship essay stand out from thousands of applications.",
    readTime: "8 min read",
    icon: "✍️",
  },
  {
    category: "FINANCIAL AID",
    title: "Complete Guide to Financial Aid for College",
    description:
      "Everything you need to know about finding and applying for financial assistance for your education.",
    readTime: "10 min read",
    icon: "💰",
  },
  {
    category: "APPLICATION TIPS",
    title: "10 Scholarship Application Mistakes to Avoid",
    description:
      "Avoid the most common mistakes students make when applying for scholarships and improve your chances.",
    readTime: "6 min read",
    icon: "🎯",
  },
];

const Guides = () => {
  return (
    <section className="py-5 bg-light">
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
              SCHOLARSHIP RESOURCES
            </div>

            <h2 className="fw-bold mb-1">
              Guides &amp; Resources
            </h2>

            <p className="text-secondary mb-0">
              Expert advice to help you find and win more scholarships.
            </p>
          </div>

          <Link
            to="/blog"
            className="btn btn-link text-primary text-decoration-none fw-semibold p-0"
          >
            View all articles →
          </Link>
        </div>

        {/* Articles */}
        <div className="row g-4">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="col-12 col-md-6 col-lg-4"
            >
              <Link
                to="/blog"
                className="text-decoration-none"
              >
                <article className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">

                  {/* Article Image Placeholder */}
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      height: "180px",
                      background:
                        "linear-gradient(135deg, #e8e5ff, #f3f1ff)",
                      fontSize: "52px",
                    }}
                  >
                    {guide.icon}
                  </div>

                  {/* Content */}
                  <div className="card-body p-4">

                    <div
                      className="text-primary fw-bold mb-2"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "1px",
                      }}
                    >
                      {guide.category}
                    </div>

                    <h5 className="fw-bold text-dark lh-sm mb-2">
                      {guide.title}
                    </h5>

                    <p className="text-secondary small mb-4">
                      {guide.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">

                      <small className="text-secondary">
                        ◷ {guide.readTime}
                      </small>

                      <span className="text-primary fw-semibold small">
                        Read more →
                      </span>

                    </div>

                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Guides;