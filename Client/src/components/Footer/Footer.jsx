import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="fixed-bottom">
        <p>PlantApp | {new Date().getFullYear()}</p>
        <span>You can also send us a message! ✉️</span>
      </div>
    </footer>
  );
}

export default Footer;
