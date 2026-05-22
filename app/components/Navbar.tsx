"use client";
import Link from "next/link";
import { useState } from "react";
import { DISCORD_URL } from "../constants";

const links = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Commands", href: "#commands" },
  { label: "Stats", href: "#stats" },
];

function AuraliaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" stroke="url(#ng)" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="5" fill="url(#ng)" opacity="0.9" />
      <circle cx="14" cy="14" r="9" stroke="url(#ng)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.4" />
      <defs>
        <linearGradient id="ng" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
      style={{ background: "rgba(5,7,13,0.88)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
          <AuraliaIcon />
          <span className="text-white font-semibold tracking-wide text-[15px]">Auralia</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>

        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-block px-4 py-2 rounded-lg text-sm font-medium text-[#05070D] hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)" }}>
          Add to Discord
        </a>

        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          style={{ background: "rgba(5,7,13,0.97)" }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              className="text-sm text-slate-400 hover:text-white transition-colors">
              {label}
            </a>
          ))}
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#05070D] text-center"
            style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)" }}>
            Add to Discord
          </a>
        </div>
      )}
    </nav>
  );
}
