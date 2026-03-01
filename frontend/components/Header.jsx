import React from "react";


const Header = () => {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-headings">
        <h1>
          Discover  
        </h1>
        <h1>
          more than
        </h1>
        <h1>
          <span className="highlight">5000+ Jobs</span>
        </h1>
        <img src="src/assets/Vector.png" alt="Vector" />
        </div>
        <p className="subheading">
          Great platform for the job seeker that searching for 
          <br />new career heights
          and passionate about startups.
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input">
            <span className="icon">🔍</span>
            <input type="text" placeholder="Job title or keyword" />
          </div>
          <div className="search-location">
            <span className="icon">📍</span>
            <select>
              <option>Florence, Italy</option>
              <option>Dhaka, Bangladesh</option>
              <option>New York, USA</option>
              <option>London, UK</option>
            </select>
          </div>
          <button className="search-btn">Search my job</button>
        </div>

        {/* Popular Categories */}
        <p className="popular">
          Popular: <span>UI Designer, UX Researcher, Android, Admin</span>
        </p>
      </div>
    </header>
  );
};

export default Header;