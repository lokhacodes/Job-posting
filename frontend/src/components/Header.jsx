import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = ["New York", "San Francisco", "London", "Berlin", "Paris", "Tokyo", "Remote"];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to jobs page with query params
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedLocation) params.append("location", selectedLocation);
    
    navigate(`/jobs?${params.toString()}`);
  };

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

          <form className="search-box" onSubmit={handleSearch}>
            
            
            <div className="input-group">
              <Search size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            
            <div className="select-group">
              <MapPin size={18} className="input-icon" />
              
              <select 
                className="select-field"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="search-btn">Search my job</button>
          </form>

          <div className="popular">
            Popular : <Link to="/jobs?category=Design" className="hover:text-blue-600">UI Designer</Link>, <Link to="/jobs?category=Technology" className="hover:text-blue-600">UX Researcher</Link>, <Link to="/jobs?category=Technology" className="hover:text-blue-600">Android</Link>, <Link to="/jobs?category=Business" className="hover:text-blue-600">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
