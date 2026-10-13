import React from "react";

const fields = [
  {
    name: "STEM",
    scholarships: "8,420 scholarships",
    icon: "⚛",
    iconClass: "text-primary bg-primary-subtle",
  },
  {
    name: "Medicine & Health",
    scholarships: "3,210 scholarships",
    icon: "♡",
    iconClass: "text-danger bg-danger-subtle",
  },
  {
    name: "Law & Legal Studies",
    scholarships: "1,890 scholarships",
    icon: "⚖",
    iconClass: "text-warning bg-warning-subtle",
  },
  {
    name: "Arts & Humanities",
    scholarships: "4,670 scholarships",
    icon: "◉",
    iconClass: "text-danger bg-danger-subtle",
  },
  {
    name: "Technology & CS",
    scholarships: "6,340 scholarships",
    icon: "▣",
    iconClass: "text-primary bg-primary-subtle",
  },
  {
    name: "International Studies",
    scholarships: "2,890 scholarships",
    icon: "◎",
    iconClass: "text-success bg-success-subtle",
  },
  {
    name: "Environment & Sustainability",
    scholarships: "1,560 scholarships",
    icon: "♧",
    iconClass: "text-success bg-success-subtle",
  },
  {
    name: "Business & Management",
    scholarships: "5,120 scholarships",
    icon: "▤",
    iconClass: "text-warning bg-warning-subtle",
  },
  {
    name: "Research & Academia",
    scholarships: "3,890 scholarships",
    icon: "♙",
    iconClass: "text-primary bg-primary-subtle",
  },
  {
    name: "Education & Teaching",
    scholarships: "2,340 scholarships",
    icon: "▢",
    iconClass: "text-primary bg-primary-subtle",
  },
];

const FieldsOfStudy = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-4">

        {/* Heading */}
        <div className="d-flex justify-content-between align-items-end mb-4">

          <div>
            <h2 className="fw-bold mb-2">
              Browse by Field of Study
            </h2>

            <p className="text-secondary mb-0">
              Find scholarships in your academic discipline
            </p>
          </div>

          <button
            type="button"
            className="btn btn-link text-primary text-decoration-none fw-semibold p-0"
          >
            All categories
            <span className="ms-2">›</span>
          </button>

        </div>

        {/* Fields */}
        <div className="row g-3">

          {fields.map((field) => (
            <div
              key={field.name}
              className="col-6 col-md-4 col-lg-3 col-xl"
            >
              <button
                type="button"
                className="card border-0 shadow-sm rounded-4 w-100 h-100 text-center p-3 bg-white"
              >

                {/* Icon */}
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 ${field.iconClass}`}
                  style={{
                    width: "48px",
                    height: "48px",
                    fontSize: "21px",
                  }}
                >
                  {field.icon}
                </div>

                {/* Name */}
                <div className="fw-semibold text-dark small">
                  {field.name}
                </div>

                {/* Count */}
                <div
                  className="text-secondary mt-1"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {field.scholarships}
                </div>

              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FieldsOfStudy;