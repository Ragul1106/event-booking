import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import withLoginProtection from "./hoc/withLoginProtection";
import { AuthProvider } from "./context/AuthContext";
const ProtectedEventDetail = withLoginProtection(EventDetail);

export default function App() {
  return (
       <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<ProtectedEventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}
