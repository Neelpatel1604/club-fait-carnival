"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TicketContextValue = {
  tickets: number;
  bumping: boolean;
  addTickets: (n: number) => void;
};

const TicketContext = createContext<TicketContextValue | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState(0);
  const [bumping, setBumping] = useState(false);

  const addTickets = useCallback((n: number) => {
    setTickets((t) => t + n);
    setBumping(true);
    window.setTimeout(() => setBumping(false), 260);
  }, []);

  const value = useMemo(
    () => ({ tickets, bumping, addTickets }),
    [tickets, bumping, addTickets],
  );

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
}

export function useTickets() {
  const ctx = useContext(TicketContext);
  if (!ctx) {
    throw new Error("useTickets must be used within TicketProvider");
  }
  return ctx;
}
