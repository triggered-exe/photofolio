import React from "react";
import styles from "./Footer.module.css"; // Import the CSS Module

const Footer = () => {
  return (
    <footer className={styles.footer}> {/* Use the CSS Module class name */}
      <p>&copy; 2023 PhotoFolio</p>
    </footer>
  );
};

export default Footer;
