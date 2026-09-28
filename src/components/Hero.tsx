export function Hero() {
  return (
    <header className="hero">
      <div className="bulb-row" aria-hidden="true">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="bulb" />
        ))}
      </div>
      <span className="kicker-tent">Sheridan College · Club Fair</span>
      <h1>
        Step Right Up to the<span className="word2">AWS Carnival</span>
      </h1>
      <p className="sub">
        Two booths. Zero cloud bills. Spin the Wheel of Cloud Fortune for instant
        tickets, match your way through the AWS service lineup, then cash in for
        stickers, buttons, diaries, and tote bags.
      </p>
      <div className="hero-cta">
        <a href="#midway" className="btn btn-primary">
          🎫 Play the Midway
        </a>
        <a href="#prizes" className="btn btn-ghost">
          See the Prizes
        </a>
      </div>
      <div className="bunting" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flag" />
        ))}
      </div>
    </header>
  );
}
