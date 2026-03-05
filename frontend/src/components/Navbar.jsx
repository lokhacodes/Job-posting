import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src="src/assets/logo 2.png" alt="Logo" className="logo-img" />
        QuickHire
      </Link>
      <ul className="nav-links">
        <li><Link to="/jobs">Find Jobs</Link></li>
        <li><a href="#">Browse Companies</a></li>
      </ul>
      <div className="nav-actions">
          <button className="admin-btn" onClick={goToDashboard}>
             Admin
           </button>
      </div>
    </nav>
  );
};

export default Navbar;
