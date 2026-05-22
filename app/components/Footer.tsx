export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="url(#fg)" strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="5" fill="url(#fg)" opacity="0.9"/>
              <circle cx="14" cy="14" r="9" stroke="url(#fg)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.4"/>
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22d3ee"/><stop offset="1" stopColor="#a78bfa"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white font-semibold text-sm">Auralia</span>
          </div>
          <p className="text-slate-600 text-xs">Discord Music Bot</p>
        </div>

        <div className="flex items-center gap-8">
          {[["Features", "#features"], ["Preview", "#preview"], ["Commands", "#commands"], ["Stats", "#stats"]].map(([l, h]) => (
            <a key={l} href={h} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{l}</a>
          ))}
        </div>

        <p className="text-slate-700 text-xs">Made by SUDO</p>
      </div>
    </footer>
  );
}
