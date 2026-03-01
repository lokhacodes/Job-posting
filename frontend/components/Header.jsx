import React from "react";
import { Search, MapPin } from "lucide-react";

const Header = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-content">
        <div className="hero-left">
          <h1>
            Discover <br />
            more than <br />
            <span>5000+ Jobs</span>
          </h1>

          <div className="underline">
            <img src="/src/assets/Vector.png" alt="underline" />
          </div>

          <p>
            Great platform for the job seeker that searching for <br />
            new career heights and passionate about startups.
          </p>

          <div className="search-box">
            
            
            <div className="input-group">
              <Search size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="input-field"
              />
            </div>

            
            <div className="select-group">
              <MapPin size={18} className="input-icon" />
              
              <select className="select-field">
                <option>Florence, Italy</option>
                <option>Berlin, Germany</option>
                <option>Madrid, Spain</option>
              </select>
            </div>

            <button className="search-btn">Search my job</button>
          </div>

          <div className="popular">
            Popular : UI Designer, UX Researcher, Android, Admin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;