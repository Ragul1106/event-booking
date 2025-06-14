import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
          value={form.email}
          required
        />

        <div className="input-group mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="form-control"
            onChange={handleChange}
            value={form.password}
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

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
