import { DISCORD_URL } from "../constants";

export default function CTA() {
  return (
    <section id="invite" className="py-24 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass rounded-2xl px-8 py-12 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-4 font-medium">Get Started</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Bring Auralia to your server.
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Start playing music with a bot that feels clean, calm, and premium.
            </p>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-lg text-sm font-semibold text-[#05070D] hover:opacity-90 hover:scale-[1.02] transition-all"
              style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)" }}>
              Add to Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
