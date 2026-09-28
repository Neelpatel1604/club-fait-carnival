"use client";

import { useEffect, useRef, useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { burstConfetti } from "@/lib/utils";

/** Ticket payout for each wheel segment (shown on the wheel). */
const SEGMENT_TICKETS = [1, 2, 3, 5, 1, 2, 3, 4];
const MAX_SPINS = 3;

export function WheelBooth() {
  const { addTickets } = useTickets();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(MAX_SPINS);
  const rotationRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  function spin() {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setLastWin(null);
    setSpinsLeft((n) => n - 1);

    const targetIndex = Math.floor(Math.random() * SEGMENT_TICKETS.length);
    const desiredAngleAtTop = targetIndex * 45 + 22.5;
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    const neededDelta =
      (360 - desiredAngleAtTop - currentMod + 3600) % 360;
    const next = rotationRef.current + 5 * 360 + neededDelta;
    setRotation(next);

    window.setTimeout(() => {
      const won = SEGMENT_TICKETS[targetIndex];
      setSpinning(false);
      setLastWin(won);
      addTickets(won);
      const rect = stageRef.current?.getBoundingClientRect();
      if (rect) {
        burstConfetti(rect.left + rect.width / 2, rect.top + 40, 22);
      }
    }, 4100);
  }

  const outOfSpins = spinsLeft <= 0;

  return (
    <section className="booth b1">
      <div className="tent-top" />
      <div className="booth-body">
        <span className="booth-tag">Booth No. 1</span>
        <h2>Wheel of Cloud Fortune</h2>
        <p className="desc">
          Give it a spin — whatever number the pointer lands on is the tickets
          you win. Instant payout, no quiz.
        </p>
        <div className="wheel-stage" ref={stageRef}>
          <div className="wheel-holder">
            <div className="pointer" aria-hidden="true" />
            <div
              className="wheel"
              id="wheel"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {SEGMENT_TICKETS.map((tickets, i) => {
                const angle = i * 45 + 22.5;
                const rad = ((angle - 90) * Math.PI) / 180;
                const r = 68;
                const x = 110 + r * Math.cos(rad);
                const y = 110 + r * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="num"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {tickets}
                  </div>
                );
              })}
              <div className="wheel-hub" />
            </div>
          </div>
          {lastWin !== null && (
            <p className="wheel-result" aria-live="polite">
              You won <strong>+{lastWin}</strong> ticket
              {lastWin === 1 ? "" : "s"}!
            </p>
          )}
          <p className="wheel-spins" aria-live="polite">
            {outOfSpins ? (
              <>No spins left</>
            ) : (
              <>
                Spins left: <strong>{spinsLeft}</strong>/{MAX_SPINS}
              </>
            )}
          </p>
          <button
            className="booth-btn"
            type="button"
            onClick={spin}
            disabled={spinning || outOfSpins}
          >
            {spinning
              ? "🎡 Spinning..."
              : outOfSpins
                ? "No spins left"
                : "🎡 Spin the Wheel"}
          </button>
        </div>
      </div>
    </section>
  );
}
