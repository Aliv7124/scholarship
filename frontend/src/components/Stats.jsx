import React from "react";

const Stats = () => {
  const stats = [
    {
      number: "47,832",
      label: "Active Scholarships",
      icon: "📖",
    },
    {
      number: "2.1M+",
      label: "Students Matched",
      icon: "👥",
    },
    {
      number: "156",
      label: "Countries Covered",
      icon: "🌐",
    },
    {
      number: "3,400+",
      label: "Scholarship Providers",
      icon: "▣",
    },
    {
      number: "₹68,000 Cr+",
      label: "Total Funding Value",
      icon: "✨",
    },
  ];

  return (
    <section className="bg-white border-bottom">
      <div className="container">
        <div className="row g-0">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="col-6 col-lg"
            >
              <div
                className={`d-flex align-items-center justify-content-center gap-3 py-4 px-3 h-100 ${
                  index !== stats.length - 1
                    ? "border-end"
                    : ""
                }`}
              >

                {/* Icon */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#eef0ff",
                    fontSize: "18px",
                  }}
                >
                  {stat.icon}
                </div>

                {/* Text */}
                <div>
                  <div className="fw-bold fs-5 text-dark">
                    {stat.number}
                  </div>

                  <div
                    className="text-secondary"
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;