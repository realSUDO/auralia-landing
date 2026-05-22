export default function Experience() {
  return (
    <section className="py-28" style={{ background: "#05070D" }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left copy */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 mb-3 font-medium">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Built for the moments when your server needs a vibe.
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Whether it&apos;s a late-night study session or a chill hangout, Auralia keeps the music
            going without interruptions, lag, or clutter.
          </p>
        </div>

        {/* Right — player mockup */}
        <div className="glass rounded-2xl p-5 max-w-sm mx-auto w-full">
          {/* Server indicator */}
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
            <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
              <span className="text-cyan-400 text-[10px]">♪</span>
            </div>
            <span className="text-xs text-slate-500">general-music</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"></span>
          </div>

          {/* Now playing */}
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2">Now Playing</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #22d3ee22, #a78bfa22)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">♫</div>
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">Midnight Bloom</p>
                <p className="text-slate-600 text-xs truncate">Ambient · 4:12</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-5">
            <div className="h-1 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full w-[38%] relative"
                style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-lg"
                  style={{ boxShadow: "0 0 8px rgba(34,211,238,0.6)" }} />
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-slate-600">1:35</span>
              <span className="text-[10px] text-slate-600">4:12</span>
            </div>
          </div>

          {/* Queue */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2">Up Next</p>
            {["Neon Drift", "Still Waters", "Late Hours"].map((t, i) => (
              <div key={t} className="flex items-center gap-2.5 py-2 border-b border-white/[0.03] last:border-0">
                <span className="text-[10px] text-slate-700 w-3">{i + 1}</span>
                <span className="text-xs text-slate-500">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
