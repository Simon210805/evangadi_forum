
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import { CiMenuBurger } from "react-icons/ci";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by looking for a token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Clear the token or any authentication state
    localStorage.removeItem("token");
    // Update authentication state
    setIsAuthenticated(false);
    // Navigate to the login page
    navigate("/login");
  };

  const handleSignIn = () => {
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div>
      <section className={style.header_container}>
        <div className={style.logo}>
          <img
            src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
            alt="Evangadi Logo"
          />
        </div>
        <button className={style.menuButton} onClick={toggleDropdown}>
          <CiMenuBurger />
        </button>
        <div className={style.menu}>
          <div
            className={`${style.dropdown} ${
              isDropdownOpen ? style.dropdownVisible : ""
            }`}
          >
            <p style={{ paddingTop: "10px" }}>Home</p>
            <p style={{ paddingTop: "10px" }}>How it works</p>
            {isAuthenticated ? (
              <button className={style.btn} onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <button className={style.btn} onClick={handleSignIn}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
