import React from "react";
import styles from "./Header.module.css"; // Import the CSS Module

const Header = () => {
  return (
    <header className={styles.header}> 
      <nav>
        <h1>PhotoFolio</h1>
      </nav>
    </header>
  );
};

export default Header;
