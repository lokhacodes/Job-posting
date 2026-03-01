
import {
  Megaphone,
  Palette,
  BarChart3,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Categories() {
  const categories = [
    {
      title: "Design",
      jobs: "235 jobs available",
      icon: <Palette size={28} />,
    },
    {
      title: "Sales",
      jobs: "756 jobs available",
      icon: <BarChart3 size={28} />,
    },
    {
      title: "Marketing",
      jobs: "140 jobs available",
      icon: <Megaphone size={28} />,
      active: true,
    },
    {
      title: "Finance",
      jobs: "325 jobs available",
      icon: <Wallet size={28} />,
    },
    {
      title: "Technology",
      jobs: "436 jobs available",
      icon: <Monitor size={28} />,
    },
    {
      title: "Engineering",
      jobs: "542 jobs available",
      icon: <Code2 size={28} />,
    },
    {
      title: "Business",
      jobs: "211 jobs available",
      icon: <Briefcase size={28} />,
    },
    {
      title: "Human Resource",
      jobs: "346 jobs available",
      icon: <Users size={28} />,
    },
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        <div className="categories-header">
          <h2>
            Explore by <span>category</span>
          </h2>

          <a href="#" className="show-all">
            Show all jobs <ArrowRight size={16} />
          </a>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category-card ${cat.active ? "active" : ""}`}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.jobs}</p>
              <span className="arrow">
                <ArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}