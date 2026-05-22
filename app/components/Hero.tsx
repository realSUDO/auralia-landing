import Image from "next/image";
import { DISCORD_URL } from "../constants";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden pt-16">
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-[0.12]"
        style={{ background: "#22d3ee" }} />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-[0.09]"
        style={{ background: "#a78bfa" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[1fr_auto] gap-16 items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-cyan-400 font-medium tracking-wide">Discord Music Bot</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Music that stays<br />
            <span className="gradient-text">with your server.</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Auralia brings clean, reliable music playback to Discord.
            Built for late-night sessions, study rooms, and community servers.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-[#05070D] hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)" }}>
              Add to Discord
            </a>
            <a href="#preview"
              className="px-6 py-3 rounded-lg text-sm font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:text-white transition-all">
              See it in action
            </a>
          </div>

          <div className="flex gap-10 border-t border-white/5 pt-8">
            {[["610+", "Hours in voice"], ["5+", "Active servers"], ["24/7", "Uptime"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-xl font-bold text-white">{v}</div>
                <div className="text-xs text-slate-600 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block float">
          <div className="relative w-64 h-64">
            <div className="absolute -inset-8 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #22d3ee, #a78bfa)" }} />
            <Image src="/auraliaPfp2.gif" alt="Auralia" fill
              className="rounded-full border border-white/10 object-cover" unoptimized priority />
          </div>
        </div>
      </div>
    </section>
  );
}
