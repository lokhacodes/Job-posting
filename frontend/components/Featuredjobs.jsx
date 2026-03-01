import React from "react";

import { FaDropbox, FaTwitter } from "react-icons/fa";
import { SiRevolut, SiCanva, SiGodaddy } from "react-icons/si";
import { BsFillCircleFill } from "react-icons/bs";

const FeaturedJobs = () => {
  return (
    <div className="featured-wrapper">
      <div className="featured-header">
        <h2>
          Featured <span>jobs</span>
        </h2>
        <a href="#" className="show-all">
          Show all jobs →
        </a>
      </div>

      <div className="featured-grid">
        {/* 1 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon revolut">R</div>
          <h4>Email Marketing</h4>
          <p className="location">Revolut • Madrid, Spain</p>
          <p className="desc">
            Revolut is looking for Email Marketing to help team ma ...
          </p>
          <div className="tags">
            <span className="tag marketing">Marketing</span>
            <span className="tag design">Design</span>
          </div>
        </div>

        {/* 2 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon dropbox">
            <FaDropbox />
          </div>
          <h4>Brand Designer</h4>
          <p className="location">Dropbox • San Francisco, US</p>
          <p className="desc">
            Dropbox is looking for Brand Designer to help team t ...
          </p>
          <div className="tags">
            <span className="tag design">Design</span>
            <span className="tag business">Business</span>
          </div>
        </div>

        {/* 3 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon pitch">
            <BsFillCircleFill />
          </div>
          <h4>Email Marketing</h4>
          <p className="location">Pitch • Berlin, Germany</p>
          <p className="desc">
            Pitch is looking for Customer Manager to join marketing t ...
          </p>
          <div className="tags">
            <span className="tag marketing">Marketing</span>
          </div>
        </div>

        {/* 4 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon blinkist">B</div>
          <h4>Visual Designer</h4>
          <p className="location">Blinklist • Granada, Spain</p>
          <p className="desc">
            Blinklist is looking for Visual Designer to help team desi ...
          </p>
          <div className="tags">
            <span className="tag design">Design</span>
          </div>
        </div>

        {/* 5 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon classpass">CP</div>
          <h4>Product Designer</h4>
          <p className="location">ClassPass • Manchester, UK</p>
          <p className="desc">
            ClassPass is looking for Product Designer to help us ...
          </p>
          <div className="tags">
            <span className="tag marketing">Marketing</span>
            <span className="tag design">Design</span>
          </div>
        </div>

        {/* 6 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon canva">
            <SiCanva />
          </div>
          <h4>Lead Designer</h4>
          <p className="location">Canva • Ontario, Ca</p>
          <p className="desc">
            Canva is looking for Lead Engineer to help develop n ...
          </p>
          <div className="tags">
            <span className="tag design">Design</span>
            <span className="tag business">Business</span>
          </div>
        </div>

        {/* 7 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon godaddy">
            <SiGodaddy />
          </div>
          <h4>Brand Strategist</h4>
          <p className="location">GoDaddy • Marseille, France</p>
          <p className="desc">
            GoDaddy is looking for Brand Strategist to join the team ...
          </p>
          <div className="tags">
            <span className="tag marketing">Marketing</span>
          </div>
        </div>

        {/* 8 */}
        <div className="featured-card">
          <div className="badge">Full Time</div>
          <div className="icon twitter">
            <FaTwitter />
          </div>
          <h4>Data Analyst</h4>
          <p className="location">Twitter • San Diego, US</p>
          <p className="desc">
            Twitter is looking for Data Analyst to help team desi ...
          </p>
          <div className="tags">
            <span className="tag technology">Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;