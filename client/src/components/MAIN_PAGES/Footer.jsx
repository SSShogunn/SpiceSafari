import React from "react";

const Footer = () => {
  return (
    <div className="footer container pt-5">
      <footer className="footer-section">
        <h4>SpiceSafari</h4>
        <p>&copy; {new Date().getFullYear()} SpiceSafari. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
