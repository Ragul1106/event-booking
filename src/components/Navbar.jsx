import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg p-4 custom-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">BookMyShow</NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto justify-content-around mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/events">Events</NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-light dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Hello, {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <NavLink to="/register" className="btn btn-outline-light">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
