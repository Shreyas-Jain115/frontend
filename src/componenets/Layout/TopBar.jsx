import React from "react";
import { BsGear, BsPerson } from "react-icons/bs"; // Bootstrap-style icons
import "bootstrap/dist/css/bootstrap.min.css";

const TopBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1e1e2f", borderBottom: "3px solid #9575cd", padding: "0.75rem 1.5rem" }}>
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-4" style={{ color: "#ffffff" }}>
          Coding Challenges Platform
        </span>
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-light d-flex align-items-center gap-2"
            onClick={() => console.log("Profile Clicked")}
          >
            <BsPerson />
            Profile
          </button>
          <button
            className="btn btn-outline-light d-flex align-items-center gap-2"
            onClick={() => console.log("Settings Clicked")}
          >
            <BsGear />
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
