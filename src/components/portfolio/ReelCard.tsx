import { useEffect, useRef, useState } from "react";
import type { Embed } from "./data";
import kkAvatar from "@/assets/kk-create.png";
import wapAvatar from "@/assets/what-a-playerr.png";

const AVATARS: Record<string, string> = {
  "kk.create": kkAvatar,
  "what.a.playerr": wapAvatar,
};

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function loadInstagramScript() {
  if (typeof window === "undefined") return;
  if (window.instgrm) { window.instgrm.Embeds.process(); return; }
  const existing = document.querySelector<HTMLScriptElement>("script[data-ig-embed]");
  if (existing) return;
  const s = document.createElement("script");
  s.src = "https://www.instagram.com/embed.js";
  s.async = true;
  s.dataset.igEmbed = "true";
  document.body.appendChild(s);
}

function IgCard({ embed }: { embed: Embed }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.opacity = "0";
    wrap.style.transition = "none";
    loadInstagramScript();
    const t = setTimeout(() => {
      window.instgrm?.Embeds.process();
      setTimeout(() => {
        if (wrap) { wrap.style.transition = "opacity 0.5s ease"; wrap.style.opacity = "1"; setLoaded(true); }
      }, 400);
    }, 50);
    return () => clearTimeout(t);
  }, [embed.url]);

  return (
    <div ref={cardRef} className="rounded-2xl border overflow-hidden flex flex-col" style={{ backgroundColor: "#0a0a0a", borderColor: "#222222" }}>
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative min-h-[480px]">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 min-h-[480px]">
              <div className="absolute inset-0 shimmer-skeleton" />
              <div className="relative z-10 flex flex-col items-center gap-3 opacity-30">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                <span className="text-white text-[9px] uppercase tracking-widest">Loading</span>
              </div>
            </div>
          )}
          <div
            ref={wrapRef}
            style={{ opacity: 0, transformOrigin: "top left" }}
            className="w-full overflow-hidden relative"
          >
            <blockquote
              className="instagram-media !m-0 !min-w-0 !w-full !max-w-none"
              data-instgrm-permalink={embed.url}
              data-instgrm-version="14"
              style={{ background: "transparent", minWidth: "unset" }}
            />
            {loaded && (
              <div
                className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3"
                style={{ height: "56px", backgroundColor: "#ffffff", zIndex: 10 }}
              >
                <img
                  src={AVATARS[embed.handle ?? ""] ?? ""}
                  alt={embed.handle}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-pink-500"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-semibold text-black leading-tight truncate">
                      {embed.handle ?? "kk.create"}
                    </span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="12" fill="#3897f0" />
                      <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-3 flex items-start justify-between gap-1.5">
        <p className="text-[11px] sm:text-sm leading-snug line-clamp-2 flex-1" style={{ color: "#ffffff" }}>
          {embed.title}
        </p>
        <span className="shrink-0 text-[8px] sm:text-[10px] uppercase tracking-wider text-accent-blue border border-accent-blue/40 rounded-full px-1.5 py-0.5">
          {embed.category}
        </span>
      </div>
    </div>
  );
}

function YtCard({ embed }: { embed: Embed }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ytLoaded, setYtLoaded] = useState(false);

  useEffect(() => { setYtLoaded(false); }, [embed.url]);

  return (
    <div ref={cardRef} className="rounded-2xl border overflow-hidden flex flex-col" style={{ backgroundColor: "#0a0a0a", borderColor: "#222222" }}>
      <div className="relative w-full bg-black overflow-hidden aspect-[9/16]">
        <div className="absolute inset-0">
          {!ytLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
              <div className="absolute inset-0 shimmer-skeleton" />
              <div className="relative z-10 flex flex-col items-center gap-3 opacity-30">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" strokeLinejoin="round" />
                </svg>
                <span className="text-white text-[9px] uppercase tracking-widest">Loading</span>
              </div>
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${embed.url}`}
            title="YouTube short"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setYtLoaded(true)}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: ytLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          />
        </div>
      </div>
      <div className="p-2 sm:p-3 flex items-start justify-between gap-1.5">
        <p className="text-[11px] sm:text-sm leading-snug line-clamp-2 flex-1" style={{ color: "#ffffff" }}>{embed.title}</p>
        <span className="shrink-0 text-[8px] sm:text-[10px] uppercase tracking-wider text-accent-blue border border-accent-blue/40 rounded-full px-1.5 py-0.5">{embed.category}</span>
      </div>
    </div>
  );
}

export function ReelCard({ embed, index = 0 }: { embed: Embed; index?: number }) {
  if (embed.type === "youtube") return <YtCard embed={embed} />;
  return <IgCard embed={embed} />;
}
