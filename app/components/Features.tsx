const features = [
  { title: "Smooth Playback", desc: "Queue, play, pause, skip. No friction, no lag." },
  { title: "Server Friendly", desc: "Built for small communities, friend groups, and study servers." },
  { title: "Clean Commands", desc: "Simple structure. No bloat, no confusion." },
  { title: "Built with Care", desc: "Refined through 610+ hours of real usage and testing." },
];

export default function Features() {
  return (
    <section id="features" className="py-16 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-3 font-medium">Why Auralia</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={f.title} className="glass rounded-xl p-6 hover:border-white/12 transition-colors">
              <div className="text-xs text-slate-700 font-mono mb-4">0{i + 1}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
