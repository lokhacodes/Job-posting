import React from "react";

import {
  FaDropbox,
} from "react-icons/fa";
import {
  SiTerraform,
  SiWebflow,
} from "react-icons/si";

const LatestJobs = () => {
  return (
    <div className="latest-wrapper">
      <div className="latest-header">
        <h2>
          Latest <span>jobs open</span>
        </h2>
        <a href="#" className="show-all">
          Show all jobs →
        </a>
      </div>

      <div className="jobs-grid">
        {/* LEFT COLUMN */}

        <div className="job-card">
          <div className="logo green">N</div>
          <div>
            <h4>Social Media Assistant</h4>
            <p>Nomad • Paris, France</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo teal">N</div>
          <div>
            <h4>Social Media Assistant</h4>
            <p>Netlify • Paris, France</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo blue">
            <FaDropbox />
          </div>
          <div>
            <h4>Brand Designer</h4>
            <p>Dropbox • San Francisco, USA</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo royal">M</div>
          <div>
            <h4>Brand Designer</h4>
            <p>Maze • San Francisco, USA</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo cyan">
            <SiTerraform />
          </div>
          <div>
            <h4>Interactive Developer</h4>
            <p>Terraform • Hamburg, Germany</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo sky">U</div>
          <div>
            <h4>Interactive Developer</h4>
            <p>Udacity • Hamburg, Germany</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo coral">P</div>
          <div>
            <h4>HR Manager</h4>
            <p>Packer • Lucern, Switzerland</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>

        <div className="job-card">
          <div className="logo purple">
            <SiWebflow />
          </div>
          <div>
            <h4>HR Manager</h4>
            <p>Webflow • Lucern, Switzerland</p>
            <div className="tags">
              <span className="tag green-tag">Full-Time</span>
              <span className="tag yellow-tag">Marketing</span>
              <span className="tag purple-tag">Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;