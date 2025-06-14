import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../context/AuthContext"; 

export default function LoginModal({ onClose }) {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Both fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      login(matchedUser);
      onClose(); 
    } else {
      setError("Invalid email or password.");
    }
  };

  return ReactDOM.createPortal(
    <div className="modal fade show d-block" style={{ backgroundColor: "#00000099" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
