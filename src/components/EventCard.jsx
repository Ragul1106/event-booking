import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-50">
        <img src={event.Poster} className="card-img-top" alt={event.Title} />
        <div className="card-body">
          <h5 className="card-title">{event.Title}</h5>
          <Link to={`/events/${event.imdbID}`} className="btn btn-primary">View Details</Link>
        </div>
      </div>
    </div>
  );
}