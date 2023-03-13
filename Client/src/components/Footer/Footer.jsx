import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="fixed-bottom">
      PlantApp | {new Date().getFullYear()}
      <span>You can also send us a message! ✉️</span>
    </footer>
  );
}

export default Footer;
