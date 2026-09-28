"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { services } from "@/lib/data";
import { burstConfetti, shuffle } from "@/lib/utils";

type Card = {
  icon: string;
  name: string;
  uid: number;
};

export function MemoryBooth() {
  const { addTickets } = useTickets();
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [roundDone, setRoundDone] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const awardedRef = useRef(false);

  const build = useCallback(() => {
    const base = [...services, ...services].map((s, i) => ({
      ...s,
      uid: i,
    }));
    setDeck(shuffle(shuffle(base)));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLock(false);
    awardedRef.current = false;
  }, []);

  useEffect(() => {
    build();
  }, [build]);

  useEffect(() => {
    if (matched.size === services.length && !awardedRef.current) {
      awardedRef.current = true;
      setRoundDone(true);
      const earned = Math.max(2, 12 - Math.max(0, moves - 6));
      addTickets(earned);
      const rect = gridRef.current?.getBoundingClientRect();
      if (rect) burstConfetti(rect.left + rect.width / 2, rect.top, 30);
    }
  }, [matched, moves, addTickets]);

  function flip(index: number) {
    if (lock) return;
    const card = deck[index];
    if (!card) return;
    if (flipped.includes(index) || matched.has(card.name)) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = next;
      if (deck[a].name === deck[b].name) {
        setMatched((prev) => new Set(prev).add(deck[a].name));
        setFlipped([]);
        setLock(false);
      } else {
        window.setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 700);
      }
    }
  }

  return (
    <section className="booth b3">
      <div className="tent-top" />
      <div className="booth-body">
        <span className="booth-tag">Booth No. 3</span>
        <h2>Service Match-Up</h2>
        <p className="desc">
          Flip two cards at a time and pair every AWS service with its icon.
          Finish in fewer moves for more tickets.
        </p>
        <div className="memory-grid" id="memoryGrid" ref={gridRef}>
          {deck.map((item, index) => {
            const isFlipped =
              flipped.includes(index) || matched.has(item.name);
            const isMatched = matched.has(item.name);
            return (
              <button
                key={`${item.name}-${item.uid}`}
                type="button"
                className={`mcard${isFlipped ? " flipped" : ""}${isMatched ? " matched" : ""}`}
                onClick={() => flip(index)}
                aria-label={`Card ${index + 1}`}
              >
                <div className="mcard-inner">
                  <div className="mcard-face mcard-back">🎪</div>
                  <div className="mcard-face mcard-front">
                    {item.icon}
                    <small>{item.name}</small>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="memory-hud">
          <span>
            Moves: <span id="memMoves">{moves}</span>
          </span>
          <span>
            Pairs: <span id="memPairs">{matched.size}</span>/6
          </span>
        </div>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          {roundDone ? (
            <>
              <p className="memory-round-msg" aria-live="polite">
                Round complete — one game only
              </p>
              <button
                className="booth-btn"
                type="button"
                disabled
                aria-disabled="true"
              >
                No rematch
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
