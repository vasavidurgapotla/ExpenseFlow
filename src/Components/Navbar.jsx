import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Navbar Component - Navigation with user badge and logout
// Topics: Functional Component, React Router (Link, useLocation, useNavigate)
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  // Get user initials (you can get this from user state/context later)
  const getUserInitials = () => {
    // For now, returning static initials
    // Later: get from logged-in user data
    return "VD";
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear user data from localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");

      alert("Logged out successfully!");
      navigate("/login");
    }
  };

  return <div className="nav-container"></div>;
};

export default Navbar;
