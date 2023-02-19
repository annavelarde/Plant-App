import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="fixed-bottom">
      PlantApp | {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
