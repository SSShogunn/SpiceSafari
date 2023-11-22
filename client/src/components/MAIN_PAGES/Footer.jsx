import React from "react";

const Footer = () => {
  return (
    <div className="fixed-bottom" style={{width:"500px"}}>
      <footer className="footer text-white p-3">
        <h4>SpiceSafari</h4>
        <p>&copy; {new Date().getFullYear()} SpiceSafari. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
