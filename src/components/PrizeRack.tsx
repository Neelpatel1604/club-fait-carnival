"use client";

import { useTickets } from "@/context/TicketContext";
import { prizes } from "@/lib/data";

export function PrizeRack() {
  const { tickets } = useTickets();

  return (
    <section className="prize-rack" id="prizes" aria-labelledby="prizes-heading">
      <div className="prize-rack-header">
        <h2 id="prizes-heading">Prize Tent</h2>
        <p>
          Rack up tickets on the Wheel and Match-Up, then redeem at our booth.
          Higher scores unlock bigger swag — stickers, custom buttons, diaries,
          and tote bags.
        </p>
      </div>
      <div className="prize-grid">
        {prizes.map((prize) => {
          const unlocked = tickets >= prize.tickets;
          return (
            <article
              key={prize.id}
              className={`prize-tier${unlocked ? " unlocked" : " locked"}`}
            >
              <span className="prize-icon" aria-hidden="true">
                {prize.icon}
              </span>
              <h3>{prize.name}</h3>
              <span className="cost">{prize.tickets} tickets</span>
              <p>{prize.blurb}</p>
              <div className="status">
                {unlocked ? "Unlocked — claim at booth" : "Keep playing"}
              </div>
            </article>
          );
        })}
      </div>
      <p className="prize-note">
        You have <strong>{tickets}</strong> tickets. Show this screen at the
        AWS booth to redeem — one prize per person while supplies last.
      </p>
    </section>
  );
}
