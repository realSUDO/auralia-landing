const groups = [
  {
    label: "Playback",
    color: "#22d3ee",
    commands: [
      { cmd: "!play", desc: "Play from YouTube or Spotify" },
      { cmd: "!pause", desc: "Pause or resume" },
      { cmd: "!skip", desc: "Skip to next track" },
      { cmd: "!stop", desc: "Stop and clear queue" },
      { cmd: "!replay", desc: "Replay current song" },
    ],
  },
  {
    label: "Queue",
    color: "#a78bfa",
    commands: [
      { cmd: "!queue", desc: "View the queue" },
      { cmd: "!clear", desc: "Clear upcoming songs" },
      { cmd: "!shuffle", desc: "Shuffle the queue" },
      { cmd: "!replayq", desc: "Replay last queue" },
    ],
  },
  {
    label: "Mood & Auto",
    color: "#818cf8",
    commands: [
      { cmd: "!mood", desc: "Play a mood playlist" },
      { cmd: "!autoplay", desc: "Toggle autoplay" },
      { cmd: "!drift", desc: "Toggle genre drift" },
      { cmd: "!lofiradio", desc: "Start lofi radio" },
    ],
  },
  {
    label: "Info & Voice",
    color: "#67e8f9",
    commands: [
      { cmd: "!join", desc: "Join your voice channel" },
      { cmd: "!leave", desc: "Leave voice channel" },
      { cmd: "!uptime", desc: "Total hours in voice" },
      { cmd: "!ping", desc: "Check latency" },
    ],
  },
];

export default function Commands() {
  return (
    <section id="commands" className="py-16 border-t border-white/[0.04]" style={{ background: "#05070D" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 mb-3 font-medium">Commands</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Simple by design.
          </h2>
          <p className="text-slate-500 mt-4 text-sm max-w-md">
            All commands are also available as slash commands. Just type <code className="text-cyan-400">/</code> in Discord.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g) => (
            <div key={g.label} className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.05]">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: g.color }} />
                <span className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: g.color }}>
                  {g.label}
                </span>
              </div>
              <div className="space-y-3">
                {g.commands.map(({ cmd, desc }) => (
                  <div key={cmd}>
                    <code className="text-sm font-mono font-semibold text-white">{cmd}</code>
                    <p className="text-xs text-slate-600 mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
