import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    resume_link: {
      type: String,
      required: true,
      match: /^https?:\/\/.+$/,
    },
    cover_note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);