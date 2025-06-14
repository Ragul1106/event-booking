import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      alert("User with this email already exists!");
      return;
    }

    users.push({ name: name.trim(), email: email.trim(), password: password.trim() });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          className="form-control mb-3"
          onChange={handleChange}
          value={form.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          value={form.email}
          required
        />
        <div className="input-group mb-4">
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
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}
