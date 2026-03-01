import React from "react";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="src/assets/logo 2.png" alt="Logo" className="logo-img" />
        QuickHire
        </div>
      <ul className="nav-links">
        <li><a href="#">Find Jobs</a></li>
        <li><a href="#">Browse Companies</a></li>
      </ul>
      <div className="nav-actions">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;