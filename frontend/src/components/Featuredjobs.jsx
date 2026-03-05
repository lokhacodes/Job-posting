import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobsAPI } from "../api/api";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await jobsAPI.getAll();
      if (response.success) {
        // Show up to 8 jobs
        setJobs(response.data.slice(0, 8));
      }
    } catch (error) {
      console.error("Failed to fetch featured jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGradientClass = (index) => {
    const gradients = [
      "revolut", "dropbox", "pitch", "blinkist", 
      "classpass", "canva", "godaddy", "twitter"
    ];
    return gradients[index % gradients.length];
  };

  const getTagClass = (category) => {
    const categoryLower = category?.toLowerCase() || "";
    if (categoryLower.includes("design")) return "design";
    if (categoryLower.includes("marketing")) return "marketing";
    if (categoryLower.includes("business")) return "business";
    if (categoryLower.includes("technology") || categoryLower.includes("engineering")) return "technology";
    return "marketing";
  };

  if (loading) {
    return (
      <div className="featured-wrapper">
        <div className="featured-header">
          <h2>
            Featured <span>jobs</span>
          </h2>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="featured-wrapper">
        <div className="featured-header">
          <h2>
            Featured <span>jobs</span>
          </h2>
          <Link to="/jobs" className="show-all">
            Show all jobs →
          </Link>
        </div>
        <div className="text-center py-20 text-gray-500">
          No featured jobs available at the moment.
        </div>
      </div>
    );
  }

  return (
    <div className="featured-wrapper">
      <div className="featured-header">
        <h2>
          Featured <span>jobs</span>
        </h2>
        <Link to="/jobs" className="show-all">
          Show all jobs →
        </Link>
      </div>

      <div className="featured-grid">
        {jobs.map((job, index) => (
          <Link to={`/jobs/${job._id}`} key={job._id} className="featured-card">
            <div className="badge">Full Time</div>
            <div className={`icon ${getGradientClass(index)}`}>
              {job.company.charAt(0).toUpperCase()}
            </div>
            <h4>{job.title}</h4>
            <p className="location">{job.company} • {job.location}</p>
            <p className="desc">
              {job.description?.substring(0, 80)}...
            </p>
            <div className="tags">
              <span className={`tag ${getTagClass(job.category)}`}>{job.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
