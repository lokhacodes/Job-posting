import React from "react";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-brand">
          <h2 className="logo">QuickHire</h2>
          <p className="tagline">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="link-section">
            <h4>About</h4>
            <ul>
              <li><a href="#">Companies</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Advice</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="link-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Help Docs</a></li>
              <li><a href="#">Guide</a></li>
              <li><a href="#">Updates</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="link-section subscribe">
            <h4>Get job notifications</h4>
            <p>The latest job news, articles, sent to your inbox weekly.</p>
            <form className="subscribe-form">
              <input type="email" placeholder="Email Address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2021 QuickHire. All rights reserved.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-dribbble"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;