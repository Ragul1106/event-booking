import React from "react";

export default function SeatLayout({ selectedSeats, setSelectedSeats }) {
  const rows = 5, cols = 6;
  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="d-flex flex-wrap" style={{ width: "200px", gap: "5px" }}>
      {[...Array(rows * cols)].map((_, i) => {
        const seat = `S${i + 1}`;
        return (
          <button
            key={seat}
            className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-secondary'} btn-sm`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
}
