import { useState, useEffect } from "react";
import { Plus, Trash2, Users, Briefcase, FileText, TrendingUp, X, CheckCircle, AlertCircle } from "lucide-react";
import { jobsAPI, applicationsAPI } from "../api/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalJobs: 0, totalApplications: 0, jobsOpen: 0, recentApplications: 0 });
  
  // Modal state
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });

  const categories = ["Design", "Marketing", "Sales", "Technology", "Engineering", "Finance", "Business", "Human Resource"];
  const locations = ["New York", "San Francisco", "London", "Berlin", "Paris", "Tokyo", "Remote", "Singapore", "Mumbai"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs
      const jobsResponse = await jobsAPI.getAll();
      if (jobsResponse.success) {
        setJobs(jobsResponse.data);
      }

      // Fetch applications
      const appsResponse = await applicationsAPI.getAll();
      if (appsResponse.success) {
        setApplications(appsResponse.data);
      }

      // Calculate stats
      setStats({
        totalJobs: jobsResponse.data?.length || 0,
        totalApplications: appsResponse.data?.length || 0,
        jobsOpen: jobsResponse.data?.length || 0,
        recentApplications: appsResponse.data?.filter(app => {
          const appDate = new Date(app.createdAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return appDate >= weekAgo;
        }).length || 0
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Job title is required";
    if (!formData.company.trim()) return "Company name is required";
    if (!formData.location) return "Location is required";
    if (!formData.category) return "Category is required";
    if (!formData.description.trim()) return "Job description is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      const response = await jobsAPI.create(formData);

      if (response.success) {
        setFormSuccess("Job created successfully!");
        setFormData({ title: "", company: "", location: "", category: "", description: "" });
        fetchData();
        
        setTimeout(() => {
          setShowAddJobModal(false);
          setFormSuccess("");
        }, 2000);
      }
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await jobsAPI.delete(id);
      if (response.success) {
        setJobs(prev => prev.filter(job => job._id !== id));
        setStats(prev => ({ ...prev, totalJobs: prev.totalJobs - 1 }));
        setDeleteConfirm({ show: false, id: null });
      }
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  if (loading) {
    return (
      <div className="admin-wrapper">
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <Navbar />
      
      <div className="job-detail-container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your job listings and applications</p>
          </div>
          <button
            onClick={() => setShowAddJobModal(true)}
            className="btn-add-job"
          >
            <Plus size={20} />
            Add New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="stat-card-admin">
            <div className="stat-icon" style={{ background: '#e0e7ff' }}>
              <Briefcase className="text-blue-600" size={24} />
            </div>
            <p className="stat-label">Total Jobs</p>
            <p className="stat-value">{stats.totalJobs}</p>
          </div>

          <div className="stat-card-admin">
            <div className="stat-icon" style={{ background: '#dcfce7' }}>
              <Users className="text-green-600" size={24} />
            </div>
            <p className="stat-label">Total Applications</p>
            <p className="stat-value">{stats.totalApplications}</p>
          </div>

          <div className="stat-card-admin">
            <div className="stat-icon" style={{ background: '#f3e8ff' }}>
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <p className="stat-label">Active Jobs</p>
            <p className="stat-value">{stats.jobsOpen}</p>
          </div>

          <div className="stat-card-admin">
            <div className="stat-icon" style={{ background: '#ffedd5' }}>
              <FileText className="text-orange-600" size={24} />
            </div>
            <p className="stat-label">This Week</p>
            <p className="stat-value">{stats.recentApplications}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <div className="tabs-header">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`tab-button ${activeTab === "jobs" ? "active" : ""}`}
            >
              Job Listings ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`tab-button ${activeTab === "applications" ? "active" : ""}`}
            >
              Applications ({applications.length})
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "jobs" && (
              <div>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job._id} className="admin-job-item">
                      <div className="admin-job-info">
                        <div className="admin-job-icon" style={{ background: 'linear-gradient(135deg, #5b4ce6 0%, #7c3aed 100%)' }}>
                          {job.company.charAt(0).toUpperCase()}
                        </div>
                        <div className="admin-job-details">
                          <h4>{job.title}</h4>
                          <p>{job.company} • {job.location} • {job.category}</p>
                        </div>
                      </div>
                      <div className="admin-job-actions">
                        <span className="admin-job-date">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => setDeleteConfirm({ show: true, id: job._id })}
                          className="btn-delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <Briefcase size={48} />
                    <p>No jobs posted yet</p>
                    <button onClick={() => setShowAddJobModal(true)} className="btn-primary">
                      Add your first job
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "applications" && (
              <div>
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <div key={app._id} className="application-card">
                      <div className="application-header">
                        <div>
                          <p className="application-name">{app.name}</p>
                          <p className="application-email">{app.email}</p>
                        </div>
                        <span className="admin-job-date">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="application-job">Applied for: {app.job_id?.title || "Unknown Job"}</p>
                      <p className="application-resume">
                        Resume: <a href={app.resume_link} target="_blank" rel="noopener noreferrer">{app.resume_link}</a>
                      </p>
                      {app.cover_note && (
                        <div className="application-cover">
                          <p>{app.cover_note}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <Users size={48} />
                    <p>No applications yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="modal-overlay-admin">
          <div className="modal-admin">
            <div className="modal-header">
              <h2>Add New Job</h2>
              <button
                onClick={() => {
                  setShowAddJobModal(false);
                  setFormError("");
                  setFormSuccess("");
                }}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2 mb-4">
                  <AlertCircle size={16} />
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex items-center gap-2 mb-4">
                  <CheckCircle size={16} />
                  {formSuccess}
                </div>
              )}

              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Google"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Location *</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  >
                    <option value="">Select location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddJobModal(false);
                    setFormError("");
                    setFormSuccess("");
                  }}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-submit"
                >
                  {submitting ? "Creating..." : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal-overlay-admin">
          <div className="modal-admin">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Job?</h3>
              <p className="text-gray-500 mb-6">This action cannot be undone. Are you sure you want to delete this job listing?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, id: null })}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="btn-submit"
                  style={{ background: '#ef4444' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

