import express from "express";
import Job from "../models/Job.js";

const router = express.Router();


// 🔹 GET ALL JOBS (with search & filter)
router.get("/", async (req, res) => {
  try {
    const { search, location, category } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (location) {
      query.location = location;
    }

    if (category) {
      query.category = category;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 GET SINGLE JOB
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 CREATE JOB (Admin)
router.post("/", async (req, res) => {
  try {
    const { title, company, location, category, description } = req.body;

    if (!title || !company || !location || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      category,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 DELETE JOB (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// 🔹 UPDATE JOB (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { title, company, location, category, description } = req.body;

    if (!title || !company || !location || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { title, company, location, category, description },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
