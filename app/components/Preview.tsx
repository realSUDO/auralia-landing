"use client";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  SkipBack, Play, Pause, SkipForward, Repeat2,
  RotateCcw, Shuffle, List, Square,
  Volume1, Volume2, Zap, Smile,
} from "lucide-react";

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
function progressBar(cur: number, total: number, len = 15) {
  const filled = Math.min(Math.floor((cur / total) * len), len);
  return "▰".repeat(filled) + "▱".repeat(len - filled);
}

const TRACKS = [
  { key: "wavy",     label: "Wavy",     artist: "Karan Aujla", file: "/Wavy.mp3" },
  { key: "cold",     label: "Cold",     artist: "Unknown",     file: "/Cold.mp3" },
  { key: "grateful", label: "Grateful", artist: "Unknown",     file: "/Grateful.mp3" },
];

type Msg =
  | { from: "user"; text: string }
  | { from: "bot"; kind: "text"; text: string }
  | { from: "bot"; kind: "player" };

// ── Avatars ───────────────────────────────────────────────────────────────────
function UserAvatar({ size = 36 }: { size?: number }) {
  return <Image src="/sudo-pfp.png" alt="sudo" width={size} height={size} className="rounded-full flex-shrink-0 self-start object-cover" />;
}
function BotAvatar({ size = 36 }: { size?: number }) {
  return <Image src="/aura-pfp.png" alt="Auralia" width={size} height={size} className="rounded-full flex-shrink-0 self-start object-cover" unoptimized />;
}

// ── Icon button ───────────────────────────────────────────────────────────────
function IBtn({ icon, onClick, variant = "secondary", disabled = false }: {
  icon: React.ReactNode; onClick: () => void;
  variant?: "secondary"|"primary"|"danger"|"success"; disabled?: boolean;
}) {
  const colors: Record<string, string> = {
    primary:   "bg-[#5865f2] text-white",
    danger:    "bg-[#ed4245]/80 text-white",
    success:   "bg-[#3ba55c]/80 text-white",
    secondary: "text-[#b5bac1]",
  };
  return (
    <button onClick={e => { e.preventDefault(); onClick(); }} disabled={disabled}
      className={`p-2 rounded transition-all flex items-center justify-center ${disabled ? "opacity-30 cursor-not-allowed" : "hover:brightness-125 active:scale-95"} ${colors[variant]}`}
      style={variant === "secondary" ? { background: "rgba(79,84,92,0.4)", border: "1px solid rgba(255,255,255,0.06)" } : {}}>
      {icon}
    </button>
  );
}

// ── Player embed ──────────────────────────────────────────────────────────────
function Player({ trackIdx, queue, onSkip, onPrev, onStop, onScrollToBottom }: {
  trackIdx: number; queue: number[];
  onSkip: () => void; onPrev: () => void; onStop: () => void;
  onScrollToBottom: () => void;
}) {
  const track = TRACKS[trackIdx];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing,  setPlaying]  = useState(false);
  const [paused,   setPaused]   = useState(false);
  const [looping,  setLooping]  = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume,   setVolume]   = useState(100);
  const [mood,     setMood]     = useState<string|null>(null);
  const [showMoods,setShowMoods]= useState(false);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    a.currentTime = 0;
    const onMeta = () => { setDuration(a.duration); a.play().catch(()=>{}); setPlaying(true); setPaused(false); };
    const onTime = () => setCurrent(a.currentTime);
    const onEnd  = () => { setPlaying(false); setPaused(false); if (!looping) onSkip(); };
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => { a.removeEventListener("loadedmetadata", onMeta); a.removeEventListener("timeupdate", onTime); a.removeEventListener("ended", onEnd); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx]);

  const resume = () => { audioRef.current?.play(); setPlaying(true); setPaused(false); };
  const pause  = () => { audioRef.current?.pause(); setPaused(true); setPlaying(false); };
  const replay = () => { const a = audioRef.current; if (!a) return; a.currentTime = 0; a.play(); setPlaying(true); setPaused(false); };
  const togglePause = () => {
    if (paused || !playing) resume();
    else pause();
    onScrollToBottom();
  };
  const toggleLoop  = () => { const a = audioRef.current; if (!a) return; a.loop = !looping; setLooping(l => !l); };
  const volDown = () => { const v = Math.max(0, volume - 20); setVolume(v); if (audioRef.current) audioRef.current.volume = v / 100; };
  const volUp   = () => { const v = Math.min(100, volume + 20); setVolume(v); if (audioRef.current) audioRef.current.volume = v / 100; };

  const accent = paused ? "#f97316" : "#00ffcc";
  const bar    = duration ? progressBar(current, duration) : "▱".repeat(15);
  const time   = duration ? `${fmt(current)} / ${fmt(duration)}` : "0:00 / --:--";
  const moods  = ["Happy","Sad","Energetic","Hip-Hop","Lofi","Metal","Lofi Radio"];

  return (
    <div className="mt-1 rounded-md overflow-hidden max-w-sm"
      style={{ borderLeft: `4px solid ${accent}`, background: "rgba(30,31,34,0.7)", border: `1px solid rgba(255,255,255,0.07)`, borderLeftColor: accent }}>
      <audio ref={audioRef} src={track.file} preload="auto" />
      <div className="px-3 pt-3 pb-2">
        <p className="text-[11px] font-semibold text-white mb-1">♪ Now Playing{paused ? " — ⏸ Paused" : ""}</p>
        <p className="text-sm font-bold text-white mb-3">{track.label} — {track.artist}</p>
        <div className="mb-3">
          <p className="text-[10px] text-[#87898c] uppercase tracking-wider mb-1">Progress</p>
          <p className="font-mono text-xs" style={{ color: accent }}>
            {bar} <span className="text-[#87898c]">{time}</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <p className="text-[10px] text-[#87898c] uppercase tracking-wider mb-0.5">Requested by</p>
            <p className="text-xs text-[#dbdee1]">sudo.dis</p>
          </div>
          <div>
            <p className="text-[10px] text-[#87898c] uppercase tracking-wider mb-0.5">Queue</p>
            <p className="text-xs text-[#dbdee1]">{queue.length} song(s)</p>
          </div>
        </div>
        <p className="text-[10px] text-[#4e5058]">Today at 12:17 AM</p>
      </div>
      <div className="px-3 pb-3 space-y-2 border-t border-white/[0.06] pt-2">
        <div className="flex gap-1.5">
          <IBtn icon={<SkipBack size={13}/>}    onClick={onPrev}     />
          <IBtn icon={(paused||!playing) ? <Play size={13}/> : <Pause size={13}/>} onClick={togglePause} variant="primary" />
          <IBtn icon={<SkipForward size={13}/>} onClick={onSkip}     />
          <IBtn icon={<Repeat2 size={13}/>}     onClick={toggleLoop} variant={looping ? "success" : "secondary"} />
        </div>
        <div className="flex gap-1.5">
          <IBtn icon={<RotateCcw size={13}/>} onClick={replay}   />
          <IBtn icon={<Shuffle size={13}/>}   onClick={() => {}} />
          <IBtn icon={<List size={13}/>}      onClick={() => {}} />
          <IBtn icon={<Square size={13}/>}    onClick={onStop}   variant="danger" />
        </div>
        <div className="flex gap-1.5 items-center flex-wrap">
          <IBtn icon={<Volume1 size={13}/>} onClick={volDown} disabled={volume <= 0}   />
          <IBtn icon={<Volume2 size={13}/>} onClick={volUp}   disabled={volume >= 100} />
          <button onClick={e => { e.preventDefault(); setAutoplay(a => !a); }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all hover:brightness-125 ${autoplay ? "bg-[#3ba55c]/80 text-white" : "text-[#b5bac1]"}`}
            style={!autoplay ? { background: "rgba(79,84,92,0.4)", border: "1px solid rgba(255,255,255,0.06)" } : {}}>
            <Zap size={11}/> Autoplay: {autoplay ? "ON" : "OFF"}
          </button>
        </div>
        <div>
          <button onClick={e => { e.preventDefault(); setShowMoods(p => !p); }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium w-full text-left transition-all hover:brightness-125 ${mood ? "bg-[#3ba55c]/40 text-green-300" : "text-[#b5bac1]"}`}
            style={!mood ? { background: "rgba(79,84,92,0.4)", border: "1px solid rgba(255,255,255,0.06)" } : {}}>
            <Smile size={11}/> {mood ? `Mood: ${mood}  —  click to change` : "Mood  —  pick a vibe"}
          </button>
          {showMoods && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {moods.map(m => (
                <button key={m} onClick={e => { e.preventDefault(); setMood(m); setShowMoods(false); }}
                  className="px-2 py-1 rounded text-[11px] text-[#b5bac1] hover:text-white transition-all"
                  style={{ background: "rgba(79,84,92,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Chat message ──────────────────────────────────────────────────────────────
function ChatMsg({ msg, queue, onSkip, onPrev, onStop, onScrollToBottom }: {
  msg: Msg; queue: number[]; onSkip: () => void; onPrev: () => void; onStop: () => void;
  onScrollToBottom: () => void;
}) {
  if (msg.from === "user") return (
    <div className="flex gap-3 px-4 py-1 hover:bg-white/[0.015]">
      <UserAvatar />
      <div>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-sm font-semibold text-[#c9cdfb]">sudo</span>
          <span className="text-[11px] text-[#4e5058]">Today at 12:16 AM</span>
        </div>
        <p className="text-[#dbdee1] text-sm">{msg.text}</p>
      </div>
    </div>
  );
  return (
    <div className="flex gap-3 px-4 py-1 hover:bg-white/[0.015]">
      <BotAvatar />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-[#22d3ee]">Auralia</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5865f2]/30 text-[#c9cdfb] font-medium uppercase tracking-wide">APP</span>
          <span className="text-[11px] text-[#4e5058]">Today at 12:16 AM</span>
        </div>
        {msg.kind === "text"   && <p className="text-[#dbdee1] text-sm">{msg.text}</p>}
        {msg.kind === "player" && <Player trackIdx={queue[0] ?? 0} queue={queue.slice(1)} onSkip={onSkip} onPrev={onPrev} onStop={onStop} onScrollToBottom={onScrollToBottom} />}
      </div>
    </div>
  );
}

// ── VC Sidebar ────────────────────────────────────────────────────────────────
function VCSidebar({ auraliaInVC, userInVC }: { auraliaInVC: boolean; userInVC: boolean }) {
  return (
    <div className="w-44 flex-shrink-0 flex flex-col border-r border-black/20 overflow-y-auto" style={{ background: "#2b2d31" }}>
      {/* Channels */}
      <div className="px-3 pt-4 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#87898c] mb-2">Text Channels</p>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded text-sm text-[#dbdee1] font-medium" style={{ background: "rgba(255,255,255,0.08)" }}>
          <span className="text-[#87898c]">#</span> general-music
        </div>
      </div>

      <div className="px-3 pt-3 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#87898c] mb-2">Voice Channels</p>

        {/* VC row */}
        <div className="mb-1">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded text-sm text-[#87898c] hover:text-[#dbdee1] hover:bg-white/[0.04] cursor-pointer transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            <span className="text-xs">lounge</span>
          </div>

          {/* Members in VC */}
          {(userInVC || auraliaInVC) && (
            <div className="ml-4 mt-1 space-y-1">
              {userInVC && (
                <div className="flex items-center gap-2 py-0.5">
                  <div className="relative">
                    <UserAvatar size={20} />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3ba55c] border-2 border-[#2b2d31]" />
                  </div>
                  <span className="text-xs text-[#dbdee1]">sudo</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#87898c" className="ml-auto"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>
                </div>
              )}
              {auraliaInVC && (
                <div className="flex items-center gap-2 py-0.5">
                  <div className="relative">
                    <BotAvatar size={20} />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3ba55c] border-2 border-[#2b2d31]" />
                  </div>
                  <span className="text-xs text-[#22d3ee]">Auralia</span>
                  {/* speaking indicator */}
                  <div className="ml-auto flex gap-0.5 items-end h-3">
                    {[2,3,2].map((h,i) => (
                      <div key={i} className="w-0.5 rounded-full bg-[#3ba55c]" style={{ height: `${h * 3}px`, animation: `pulse-glow ${0.6 + i * 0.2}s ease-in-out infinite` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User panel at bottom */}
      <div className="mt-auto px-2 py-2 border-t border-black/20 flex items-center gap-2" style={{ background: "#232428" }}>
        <UserAvatar size={28} />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#f2f3f5] truncate">sudo</p>
          <p className="text-[10px] text-[#87898c] truncate">#0001</p>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Preview() {
  const [messages,    setMessages]    = useState<Msg[]>([
    { from: "bot", kind: "text", text: "Hey! Try `!play wavy` to get started 🎵" },
  ]);
  const [input,       setInput]       = useState("");
  const [queue,       setQueue]       = useState<number[]>([]);
  const [history,     setHistory]     = useState<number[]>([]);
  const [userInVC,    setUserInVC]    = useState(true);
  const [auraliaInVC, setAuraliaInVC] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const chat = chatRef.current;
      chat?.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const addMsg = (...msgs: Msg[]) => setMessages(prev => [...prev, ...msgs]);

  const skip = useCallback(() => {
    setQueue(q => {
      if (q.length === 0) { addMsg({ from: "bot", kind: "text", text: "⏭ Queue is empty." }); return q; }
      const [, ...rest] = q;
      setMessages(prev => {
        const ri = prev.length - 1 - [...prev].reverse().findIndex(m => m.from === "bot" && m.kind === "player");
        const n = [...prev]; n[ri] = { from: "bot", kind: "player" }; return n;
      });
      return rest;
    });
  }, []);

  const prev = useCallback(() => {
    setHistory(h => {
      if (h.length === 0) { addMsg({ from: "bot", kind: "text", text: "⏮ No previous track." }); return h; }
      const last = h[h.length - 1];
      setQueue(q => [last, ...q]);
      setMessages(p => {
        const ri = p.length - 1 - [...p].reverse().findIndex(m => m.from === "bot" && m.kind === "player");
        const n = [...p]; n[ri] = { from: "bot", kind: "player" }; return n;
      });
      return h.slice(0, -1);
    });
  }, []);

  const stop = useCallback(() => {
    setQueue([]); setHistory([]);
    setAuraliaInVC(false);
    setMessages(prev => prev.filter(m => !(m.from === "bot" && m.kind === "player")));
    addMsg({ from: "bot", kind: "text", text: "⏹ Stopped. Left voice channel." });
  }, []);

  const send = () => {
    const val = input.trim(); if (!val) return;
    setInput("");
    const raw = val.toLowerCase();
    const userMsg: Msg = { from: "user", text: val };

    // join
    if (raw === "!join" || raw === "/join") {
      setAuraliaInVC(true);
      addMsg(userMsg, { from: "bot", kind: "text", text: "✅ Joined **lounge**." });
      return;
    }
    // leave
    if (raw === "!leave" || raw === "/leave") {
      setAuraliaInVC(false);
      setQueue([]); setHistory([]);
      setMessages(prev => prev.filter(m => !(m.from === "bot" && m.kind === "player")));
      addMsg(userMsg, { from: "bot", kind: "text", text: "👋 Left voice channel." });
      return;
    }
    // play
    if (raw.startsWith("!play") || raw.startsWith("/play") || raw.startsWith("!p ")) {
      const q = raw.replace(/^[!/](play|p)\s*/, "").trim();
      const idx = TRACKS.findIndex(t => !q || q.includes(t.key) || q.includes(t.label.toLowerCase()));
      if (idx === -1) {
        addMsg(userMsg, { from: "bot", kind: "text", text: `No match. Try: \`!play wavy\`, \`!play cold\`, \`!play grateful\`` });
        return;
      }
      const hasPlayer = messages.some(m => m.from === "bot" && m.kind === "player");
      setAuraliaInVC(true);
      if (hasPlayer) {
        setQueue(q2 => [...q2, idx]);
        addMsg(userMsg, { from: "bot", kind: "text", text: `Added **${TRACKS[idx].label}** to queue.` });
      } else {
        // auto-queue the other two tracks
        const rest = TRACKS.map((_, i) => i).filter(i => i !== idx);
        setQueue([idx, ...rest]);
        addMsg(userMsg, { from: "bot", kind: "text", text: "hollup, I'm getting ur track 🎵" }, { from: "bot", kind: "player" });
      }
      return;
    }
    if (raw === "!skip"  || raw === "/skip")  { addMsg(userMsg); skip(); return; }
    if (raw === "!prev"  || raw === "/prev" || raw === "!previous") { addMsg(userMsg); prev(); return; }
    if (raw === "!stop"  || raw === "/stop")  { addMsg(userMsg); stop(); return; }
    if (raw === "!pause" || raw === "/pause") { addMsg(userMsg, { from: "bot", kind: "text", text: "⏸ Paused." }); return; }
    if (raw === "!queue" || raw === "/queue") {
      const qNames = queue.map((i, n) => `${n + 1}. ${TRACKS[i].label}`).join("\n") || "Queue is empty.";
      addMsg(userMsg, { from: "bot", kind: "text", text: `📋 Queue:\n${qNames}` });
      return;
    }
    if (raw === "!loop" || raw === "/loop") { addMsg(userMsg, { from: "bot", kind: "text", text: "🔂 Loop toggled." }); return; }
    addMsg(userMsg, { from: "bot", kind: "text", text: `Unknown command. Try \`!play wavy\`, \`!join\`, \`!skip\`, \`!prev\`, \`!queue\`, \`!stop\`` });
  };

  return (
    <section id="preview" className="py-16 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-3 font-medium">Preview</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            See it. Try it.
          </h2>
          <p className="text-[#87898c] mt-3 text-sm">
            Type <code className="text-cyan-400">!play wavy</code> — Auralia joins your VC and starts playing.
          </p>
        </div>

        {/* Discord window */}
        <div className="rounded-xl overflow-hidden flex flex-col"
          style={{ background: "#313338", height: "600px", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.6)" }}>

          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/30 flex-shrink-0" style={{ background: "#2b2d31" }}>
            <span className="text-[#87898c] font-bold">#</span>
            <span className="text-[#f2f3f5] text-sm font-semibold">general-music</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#3ba55c]" />
              <span className="text-[11px] text-[#87898c]">Auralia online</span>
            </div>
          </div>

          {/* Body: sidebar + chat */}
          <div className="flex flex-1 min-h-0">
            <VCSidebar auraliaInVC={auraliaInVC} userInVC={userInVC} />

            {/* Chat */}
            <div className="flex-1 flex flex-col min-w-0">
              <div ref={chatRef} className="flex-1 overflow-y-auto py-4 space-y-0.5" style={{ overscrollBehavior: "contain" }}>
                {messages.map((m, i) => (
                  <ChatMsg key={i} msg={m} queue={queue} onSkip={skip} onPrev={prev} onStop={stop} onScrollToBottom={scrollToBottom} />
                ))}
              </div>

              {/* Input */}
              <div className="px-4 pb-4 pt-2 flex-shrink-0">
                <div className="flex items-center gap-2 rounded-lg px-4 py-2.5" style={{ background: "#383a40" }}>
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); send(); } }}
                    placeholder="Message #general-music"
                    className="flex-1 bg-transparent text-sm text-[#dbdee1] placeholder-[#4e5058] outline-none" />
                  <button onClick={e => { e.preventDefault(); send(); }}
                    className="text-sm px-3 py-1 rounded font-semibold text-white flex-shrink-0 hover:bg-[#4752c4] transition-colors"
                    style={{ background: "#5865f2" }}>
                    ↵
                  </button>
                </div>
                <p className="text-[10px] text-[#4e5058] mt-1.5 px-1">
                  Try: <span className="text-[#87898c]">!play wavy · !play cold · !play grateful · !join · !skip · !prev · !queue · !stop</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
