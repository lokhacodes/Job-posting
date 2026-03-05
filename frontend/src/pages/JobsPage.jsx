import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { jobsAPI } from "../api/api";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  const locations = ["New York", "San Francisco", "London", "Berlin", "Paris", "Tokyo", "Remote"];
  const categories = ["Design", "Marketing", "Sales", "Technology", "Engineering", "Finance", "Business", "Human Resource"];

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedLocation) params.location = selectedLocation;
      if (selectedCategory) params.category = selectedCategory;

      const response = await jobsAPI.getAll(params);
      if (response.success) {
        setJobs(response.data);
      }
    } catch (err) {
      setError("Failed to load jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedLocation, selectedCategory]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedCategory("");
  };

  const hasActiveFilters = searchTerm || selectedLocation || selectedCategory;

  return (
    <div className="jobs-page-wrapper">
      <Navbar />
      
      <div className="job-detail-container">
        {/* Search Header */}
        <div className="jobs-page-header">
          <h1>Find Your Dream Job</h1>
          <p>Browse thousands of job openings from top companies</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="jobs-filters">
            {/* Search Input */}
            <div className="relative" style={{ flex: 1 }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input pl-10"
              />
            </div>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="active-filters">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="filter-tag filter-tag-search">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm("")}><X size={14} /></button>
                </span>
              )}
              {selectedLocation && (
                <span className="filter-tag filter-tag-location">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation("")}><X size={14} /></button>
                </span>
              )}
              {selectedCategory && (
                <span className="filter-tag filter-tag-category">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("")}><X size={14} /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-700 ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="jobs-count">
          {loading ? "Loading..." : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="empty-state">
            <p className="text-red-500 text-lg">{error}</p>
            <button onClick={fetchJobs} className="btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* Jobs List */}
        {!loading && !error && (
          <div className="jobs-list">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="empty-state bg-white rounded-xl">
                <p>No jobs found matching your criteria</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JobsPage;

