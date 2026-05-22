export default function Stats() {
  return (
    <section id="stats" className="py-28 border-y border-white/[0.04]" style={{ background: "#080B12" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Big number */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-6 font-medium">By the numbers</p>
            <div className="flex items-end gap-1 mb-3">
              <span className="text-[96px] md:text-[120px] font-bold leading-none text-white"
                style={{ fontFamily: "var(--font-playfair)" }}>
                610
              </span>
              <span className="text-5xl font-bold text-cyan-400 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}>
                +
              </span>
            </div>
            <p className="text-slate-400 text-xl mb-2">Hours in voice channels</p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Every hour helped refine the bot, fix edge cases, and improve the listening experience.
            </p>
          </div>

          {/* Secondary */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "5+", label: "Active Servers", sub: "Small communities & friend groups" },
              { value: "24/7", label: "Availability", sub: "Hosted on a dedicated VPS" },
              { value: "Real", label: "Usage", sub: "Not a demo — actively used daily" },
              { value: "0", label: "Paywalls", sub: "Completely free to use" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-5">
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs font-semibold text-slate-300 mb-1">{s.label}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
