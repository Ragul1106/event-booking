import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { FaCheckCircle } from "react-icons/fa";
import "./BookingModal.css"; 

export default function BookingModal({ event, seats, onClose }) {
  const ticketInfo = `${event.Title} | Seats: ${seats.join(", ")}`;

  return ReactDOM.createPortal(
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <FaCheckCircle className="check-icon" />
          <h5 className="modal-title">Booking Confirmed!</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="custom-modal-body text-center">
          <h6 className="event-title">{event.Title}</h6>
          <p className="seats-info">Seats: <strong>{seats.join(", ")}</strong></p>

          <div className="qr-wrapper">
            <QRCode value={ticketInfo} size={140} />
            <p className="qr-text">Scan at entry</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
