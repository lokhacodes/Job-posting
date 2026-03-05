import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Jobs API
export const jobsAPI = {
  // Get all jobs with optional filters
  getAll: async (params = {}) => {
    const response = await api.get("/jobs", { params });
    return response.data;
  },

  // Get single job by ID
  getById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Create new job (Admin)
  create: async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
  },

  // Delete job (Admin)
  delete: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // Update job (Admin)
  update: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },
};

// Applications API
export const applicationsAPI = {
  // Submit job application
  submit: async (applicationData) => {
    const response = await api.post("/applications", applicationData);
    return response.data;
  },

  // Get all applications (Admin)
  getAll: async () => {
    const response = await api.get("/applications");
    return response.data;
  },
};

export default api;
