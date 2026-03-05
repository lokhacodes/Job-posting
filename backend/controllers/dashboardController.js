import Job from "../models/Job.js";
import Application from "../models/Applications.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const jobsOpen = totalJobs;
    
    // Get applications per job for recent activity
    const recentApplications = await Application.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      totalJobs,
      totalApplications,
      jobsOpen,
      recentApplications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
