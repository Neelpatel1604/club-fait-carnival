"use client";

import { TicketProvider } from "@/context/TicketContext";
import { TicketBar } from "@/components/TicketBar";
import { Hero } from "@/components/Hero";
import { PrizeRack } from "@/components/PrizeRack";
import { WheelBooth } from "@/components/WheelBooth";
import { MemoryBooth } from "@/components/MemoryBooth";
import { SiteFooter } from "@/components/SiteFooter";

export function CarnivalApp() {
  return (
    <TicketProvider>
      <TicketBar />
      <Hero />
      <section className="intro">
        <p>
          No sign-up, no SDK, no bill at the end of the night — just two quick
          games built around the AWS services our club actually plays with. Rack
          up tickets at both booths, unlock prizes, and see how high you can
          climb before the fair wraps.
        </p>
      </section>
      <PrizeRack />
      <main className="midway" id="midway">
        <WheelBooth />
        <MemoryBooth />
      </main>
      <SiteFooter />
    </TicketProvider>
  );
}
