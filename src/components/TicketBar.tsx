"use client";

import { useTickets } from "@/context/TicketContext";

export function TicketBar() {
  const { tickets, bumping } = useTickets();

  return (
    <div className="ticket-bar">
      <div className="ticket-bar-inner">
        <div className="brand-mini">
          <span className="tent" aria-hidden="true">
            🎪
          </span>
          <span className="brand-text">
            <span className="brand-full">Sheridan AWS Student Builder Group</span>
            <span className="brand-short">Sheridan AWS</span>
          </span>
        </div>
        <div className={`tickets-display${bumping ? " bump" : ""}`}>
          🎟️ <span className="tickets-label">Tickets:</span>{" "}
          <span className="num">{tickets}</span>
        </div>
      </div>
    </div>
  );
}
