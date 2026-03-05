
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { jobsAPI, applicationsAPI } from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await jobsAPI.getById(id);
        if (response.success) {
          setJob(response.data);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Failed to load job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email format";
    if (!formData.resume_link.trim()) return "Resume link is required";
    if (!/^https?:\/\/.+/.test(formData.resume_link)) return "Resume link must be a valid URL";
    if (!formData.cover_note.trim()) return "Cover note is required";
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
      const response = await applicationsAPI.submit({
        job_id: id,
        ...formData
      });

      if (response.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
      }
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const getCompanyGradient = () => {
    const gradients = [
      "linear-gradient(135deg, #059669 0%, #10b981 100%)",
      "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
      "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
      "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
      "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
      "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
      "linear-gradient(135deg, #dc2626 0%, #f56565 100%)",
      "linear-gradient(135deg, #5b21b6 0%, #a855f7 100%)",
      "linear-gradient(135deg, #5b4ce6 0%, #7c3aed 100%)"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="main-container" style={{ padding: '80px 20px' }}>
          <div className="empty-state">
            <p className="text-red-500 text-lg mb-4">{error || "Job not found"}</p>
            <Link to="/jobs" className="text-blue-600 hover:underline">
              Back to Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="job-detail-wrapper">
      <Navbar />
      
      <div className="main-container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="job-detail-container">
          <div className="job-detail-card">
            <div className="job-detail-header">
              <div 
                className="job-detail-company-icon"
                style={{ background: getCompanyGradient() }}
              >
                {job.company.charAt(0).toUpperCase()}
              </div>
              <h1 className="job-detail-title">{job.title}</h1>
              <p className="job-detail-company">{job.company}</p>

              <div className="job-detail-meta">
                <span>
                  <MapPin size={16} />
                  {job.location}
                </span>
                <span>
                  <Briefcase size={16} />
                  {job.category}
                </span>
                <span>
                  <Clock size={16} />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="job-detail-body">
              <div className="job-detail-section">
                <h2>Job Description</h2>
                <div className="job-detail-description">
                  {job.description}
                </div>
              </div>
            </div>

            <div className="job-detail-apply">
              {!showApplyForm ? (
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="apply-button"
                >
                  Apply Now
                </button>
              ) : (
                <div className="apply-form">
                  {submitSuccess ? (
                    <div className="success-message">
                      <CheckCircle className="success-icon" size={48} />
                      <h4>Application Submitted!</h4>
                      <p>Your application has been sent successfully.</p>
                      <button
                        onClick={() => {
                          setShowApplyForm(false);
                          setSubmitSuccess(false);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5b4ce6', marginTop: '16px' }}
                      >
                        Submit another application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3>Submit Application</h3>
                      
                      {formError && (
                        <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                          {formError}
                        </div>
                      )}

                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="form-group">
                        <label>Resume Link (URL) *</label>
                        <input
                          type="url"
                          name="resume_link"
                          value={formData.resume_link}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>

                      <div className="form-group">
                        <label>Cover Note *</label>
                        <textarea
                          name="cover_note"
                          value={formData.cover_note}
                          onChange={handleInputChange}
                          rows="4"
                          placeholder="Tell us why you're a great fit for this role..."
                          style={{ resize: 'vertical' }}
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          type="button"
                          onClick={() => setShowApplyForm(false)}
                          className="btn-cancel"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-submit"
                        >
                          {submitting ? "Submitting..." : "Submit Application"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="job-detail-card" style={{ marginTop: '24px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '16px' }}>Job Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Location</p>
                <p style={{ fontWeight: '500', color: '#1a202c' }}>{job.location}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Category</p>
                <p style={{ fontWeight: '500', color: '#1a202c' }}>{job.category}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Company</p>
                <p style={{ fontWeight: '500', color: '#1a202c' }}>{job.company}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>Posted</p>
                <p style={{ fontWeight: '500', color: '#1a202c' }}>
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <Link
                to="/jobs"
                style={{ display: 'block', width: '100%', padding: '12px', textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#64748b', textDecoration: 'none', transition: 'all 0.2s' }}
              >
                View Similar Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetailPage;

