import express from "express";
import Application from "../models/Applications.js";
import Job from "../models/Job.js";

const router = express.Router();

// Email validation regex
const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

// URL validation regex
const isValidURL = (url) => {
  return /^https?:\/\/.+/.test(url);
};


// 🔹 SUBMIT APPLICATION
router.post("/", async (req, res) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    // Validate required fields
    if (!job_id || !name || !email || !resume_link || !cover_note) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate name
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate resume link is a valid URL
    if (!isValidURL(resume_link)) {
      return res.status(400).json({
        success: false,
        message: "Resume link must be a valid URL (starting with http:// or https://)",
      });
    }

    // Validate cover note
    if (cover_note.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Cover note must be at least 10 characters",
      });
    }

    // Check if job exists
    const jobExists = await Job.findById(job_id);
    if (!jobExists) {
      return res.status(404).json({
        success: false,
        message: "Job does not exist",
      });
    }

    const application = await Application.create({
      job_id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      resume_link: resume_link.trim(),
      cover_note: cover_note.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 GET ALL APPLICATIONS (Admin)
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      // include category so front‑end can produce summaries
      .populate("job_id", "title company location category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
