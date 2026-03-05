import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobsAPI } from "../api/api";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const response = await jobsAPI.getAll();
      if (response.success) {
        // Show latest 8 jobs
        setJobs(response.data.slice(0, 8));
      }
    } catch (error) {
      console.error("Failed to fetch latest jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLogoClass = (index) => {
    const logos = ["green", "teal", "blue", "royal", "cyan", "sky", "coral", "purple"];
    return logos[index % logos.length];
  };

  const getTagClass = (category) => {
    const categoryLower = category?.toLowerCase() || "";
    if (categoryLower.includes("design")) return "purple-tag";
    if (categoryLower.includes("marketing")) return "yellow-tag";
    if (categoryLower.includes("business") || categoryLower.includes("hr")) return "green-tag";
    return "yellow-tag";
  };

  if (loading) {
    return (
      <div className="latest-wrapper">
        <div className="latest-header">
          <h2>
            Latest <span>jobs open</span>
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
      <div className="latest-wrapper">
        <div className="latest-header">
          <h2>
            Latest <span>jobs open</span>
          </h2>
          <Link to="/jobs" className="show-all">
            Show all jobs →
          </Link>
        </div>
        <div className="text-center py-20 text-gray-500">
          No jobs available at the moment. Check back later!
        </div>
      </div>
    );
  }

  return (
    <div className="latest-wrapper">
      <div className="latest-header">
        <h2>
          Latest <span>jobs open</span>
        </h2>
        <Link to="/jobs" className="show-all">
          Show all jobs →
        </Link>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <Link to={`/jobs/${job._id}`} key={job._id} className="job-card">
            <div className={`logo ${getLogoClass(index)}`}>
              {job.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4>{job.title}</h4>
              <p>{job.company} • {job.location}</p>
              <div className="tags">
                <span className="tag green-tag">Full-Time</span>
                <span className={`tag ${getTagClass(job.category)}`}>{job.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;

