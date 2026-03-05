
import { Link } from "react-router-dom";
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
      category: "Design",
    },
    {
      title: "Sales",
      jobs: "756 jobs available",
      icon: <BarChart3 size={28} />,
      category: "Sales",
    },
    {
      title: "Marketing",
      jobs: "140 jobs available",
      icon: <Megaphone size={28} />,
      category: "Marketing",
      active: true,
    },
    {
      title: "Finance",
      jobs: "325 jobs available",
      icon: <Wallet size={28} />,
      category: "Finance",
    },
    {
      title: "Technology",
      jobs: "436 jobs available",
      icon: <Monitor size={28} />,
      category: "Technology",
    },
    {
      title: "Engineering",
      jobs: "542 jobs available",
      icon: <Code2 size={28} />,
      category: "Engineering",
    },
    {
      title: "Business",
      jobs: "211 jobs available",
      icon: <Briefcase size={28} />,
      category: "Business",
    },
    {
      title: "Human Resource",
      jobs: "346 jobs available",
      icon: <Users size={28} />,
      category: "Human Resource",
    },
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        <div className="categories-header">
          <h2>
            Explore by <span>category</span>
          </h2>

          <Link to="/jobs" className="show-all">
            Show all jobs <ArrowRight size={16} />
          </Link>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/jobs?category=${cat.category}`}
              className={`category-card ${cat.active ? "active" : ""}`}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.jobs}</p>
              <span className="arrow">
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
