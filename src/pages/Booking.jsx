import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventDetails } from "../api/omdb";

export default function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventDetails(eventId).then(setEvent);
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{event.Title}</h2>
      <img src={event.Poster} alt={event.Title} />
      <p><strong>Year:</strong> {event.Year}</p>
      <p><strong>Plot:</strong> {event.Plot}</p>
    </div>
  );
}
