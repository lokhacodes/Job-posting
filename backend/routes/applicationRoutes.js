import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

const router = express.Router();


// 🔹 SUBMIT APPLICATION
router.post("/", async (req, res) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    if (!job_id || !name || !email || !resume_link || !cover_note) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
      name,
      email,
      resume_link,
      cover_note,
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


export default router;