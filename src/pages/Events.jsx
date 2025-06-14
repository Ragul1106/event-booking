import React, { useEffect, useState } from "react";
import { fetchEvents } from "../api/omdb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [pendingEventId, setPendingEventId] = useState(null);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleEventClick = (eventId) => {
    if (user) {
      navigate(`/events/${eventId}`);
    } else {
      setPendingEventId(eventId);
      setShowLogin(true);         
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Events</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event.imdbID} className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src={event.Poster}
                className="card-img-top"
                alt={event.Title}
              />
              <div className="card-body">
                <h5 className="card-title">{event.Title}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEventClick(event.imdbID)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false);
            setPendingEventId(null);
          }}
          onLogin={(loggedInUser) => {
            login(loggedInUser);               
            setShowLogin(false);
            if (pendingEventId) {
              navigate(`/events/${pendingEventId}`); 
            }
          }}
        />
      )}
    </div>
  );
}
