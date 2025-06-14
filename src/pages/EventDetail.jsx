import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingModal from "../components/BookingModal"; 

const API_KEY = "fe59de73";

export default function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${eventId}&apikey=${API_KEY}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Failed to fetch event:", err));
  }, [eventId]);

  const seatGrid = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    setShowModal(true);
  };

  if (!event) return <div className="text-center mt-5">Loading event...</div>;

  return (
    <div className="container my-5">
      <h2>{event.Title}</h2>
      <img
        src={event.Poster}
        alt={event.Title}
        className="img-fluid mb-3"
        style={{ maxHeight: "400px" }}
      />
      <p>{event.Plot}</p>

      <h4 className="mt-4">Select Your Seats:</h4>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {seatGrid.map((seat) => (
          <button
            key={seat}
            className={`btn ${
              selectedSeats.includes(seat)
                ? "btn-success"
                : "btn-outline-secondary"
            }`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleBooking}>
        Book Now
      </button>

      {showModal && (
        <BookingModal
          event={event}
          seats={selectedSeats}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
