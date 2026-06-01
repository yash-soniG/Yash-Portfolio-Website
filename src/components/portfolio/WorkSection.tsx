import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReelCard } from "./ReelCard";
import type { Embed } from "./data";

type Props = {
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  categories: readonly string[];
  youtubeCategories?: readonly string[];
  instagram: Embed[];
  youtube: Embed[];
  stats?: { label: string; value: string }[];
  youtubeSubs: string;
  sectionId: string;
  igHandle?: string;
  igProfileUrl?: string;
  ytHandle?: string;
  ytProfileUrl?: string;
};

export function WorkSection({
  logo,
  title,
  subtitle,
  description,
  categories,
  youtubeCategories,
  instagram,
  youtube,
  stats,
  youtubeSubs,
  sectionId,
  igHandle,
  igProfileUrl,
  ytHandle,
  ytProfileUrl,
}: Props) {
  const [platform, setPlatform] = useState<"instagram" | "youtube">("instagram");
  const [category, setCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prevVisibleRef = useRef(4);

  const source = platform === "instagram" ? instagram : youtube;
  const handle = platform === "instagram" ? igHandle : ytHandle;
  const profileUrl = platform === "instagram" ? igProfileUrl : ytProfileUrl;

  const activeCategories = useMemo(() => {
    if (platform === "youtube" && youtubeCategories) {
      return youtubeCategories;
    }
    if (platform === "youtube") {
      return ["All", ...new Set(youtube.map((e) => e.category))];
    }
    return categories;
  }, [platform, youtube, categories, youtubeCategories]);

  const filtered = useMemo(() => {
    if (category !== "All") return source.filter((e) => e.category === category);
    const byCategory: Record<string, Embed[]> = {};
    source.forEach((e) => {
      if (!byCategory[e.category]) byCategory[e.category] = [];
      byCategory[e.category].push(e);
    });
    const perCategory = source.length <= 20 ? 4 : 2;
    return Object.values(byCategory)
      .flatMap((items) => items.slice(0, perCategory))
      .sort(() => Math.random() - 0.5);
  }, [source, category]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const isExpanded = visibleCount > 4;

  function handleShowMore() {
    const firstNewIndex = visibleCount;
    prevVisibleRef.current = visibleCount;
    setVisibleCount((v) => Math.min(v + 4, filtered.length));
    requestAnimationFrame(() => {
      setTimeout(() => {
        const grid = gridRef.current;
        const target = grid?.children[firstNewIndex] as HTMLElement | undefined;
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
    });
  }

  function handleShowLess() {
    setVisibleCount(4);
    requestAnimationFrame(() => {
      const el = headerRef.current;
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }

  function handleCategoryChange(c: string) {
    setCategory(c);
    setVisibleCount(4);
  }

  function handlePlatformChange(p: "instagram" | "youtube") {
    setPlatform(p);
    setCategory(p === "youtube" && youtubeCategories ? youtubeCategories[0] : "All");
    setVisibleCount(4);
  }

  return (
    <div id={sectionId}>
      <div ref={headerRef} className="flex items-center gap-4">
        <img
          src={logo}
          alt={`${title} logo`}
          className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10"
        />
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-accent-blue">{subtitle}</p>
        </div>
      </div>
      <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">{description}</p>

      {stats && (
        <div className="mt-8 flex flex-wrap gap-2 text-xs">
          {stats.map((s) => (
            <span
              key={s.label}
              className="rounded-full border border-hairline px-3 py-1.5 text-muted-foreground"
            >
              <span className="text-foreground font-medium">{s.value}</span> {s.label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-hairline p-1 bg-white/[0.02]">
          {(["instagram", "youtube"] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePlatformChange(p)}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                platform === p
                  ? "bg-accent-blue text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "instagram" ? "Instagram" : "YouTube"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {activeCategories.map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryChange(c)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              category === c
                ? "border-accent-blue text-accent-blue bg-accent-blue/10"
                : "border-hairline text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Mobile: horizontal carousel with peek + arrows + dots (shows ALL filtered) */}
      <MobileCarousel items={filtered} />

      {/* Tablet/Desktop: grid */}
      <div
        ref={gridRef}
        className="mt-8 hidden sm:grid gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {visible.map((e, i) => (
          <ReelCard key={e.id} embed={e} index={i} />
        ))}
      </div>

      <div className="mt-10 hidden sm:flex flex-col items-center gap-2">
        {hasMore && (
          <button
            onClick={handleShowMore}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent-blue/40 text-sm text-accent-blue hover:bg-accent-blue hover:text-white hover:border-accent-blue hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Show More
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </button>
        )}
        {isExpanded && (
          <button
            onClick={handleShowLess}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-hairline text-sm text-muted-foreground hover:border-white/30 hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Show Less
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function MobileCarousel({ items }: { items: Embed[] }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; id: number; locked: boolean | null } | null>(
    null,
  );

  // Reset to first card when items change (e.g. category switch)
  useEffect(() => {
    setActive(0);
  }, [items]);

  // Center the active card
  const recalc = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const child = track.children[active] as HTMLElement | undefined;
    if (!child) return;
    const containerW = container.getBoundingClientRect().width;
    const childW = child.getBoundingClientRect().width;
    const childLeft = child.offsetLeft;
    setTranslate(containerW / 2 - (childLeft + childW / 2));
  };

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items]);

  function goTo(i: number) {
    setActive(Math.min(Math.max(i, 0), items.length - 1));
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId, locked: null };
    setIsDragging(true);
  }
  function onPointerMove(e: React.PointerEvent) {
    const start = dragStartRef.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (start.locked === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      start.locked = Math.abs(dx) > Math.abs(dy);
      if (!start.locked) {
        // vertical scroll — abandon drag
        dragStartRef.current = null;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }
      try {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch {
        /* noop */
      }
    }
    e.preventDefault();
    setDragOffset(dx);
  }
  function endDrag(e: React.PointerEvent) {
    const start = dragStartRef.current;
    if (!start) return;
    const diff = -dragOffset;
    dragStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* noop */
    }
    if (Math.abs(diff) < 40) return;
    goTo(active + (diff > 0 ? 1 : -1));
  }

  if (items.length === 0) return null;

  return (
    <div className="sm:hidden mt-8 relative">
      <div
        ref={containerRef}
        className="-mx-6 overflow-hidden pb-2 select-none relative"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className={`flex will-change-transform ${
            isDragging ? "" : "transition-transform duration-500 ease-out"
          }`}
          style={{ transform: `translateX(${translate + dragOffset}px)` }}
        >
          {items.map((e, i) => {
            const isActive = i === active;
            const isNeighbor = Math.abs(i - active) <= 1;
            return (
              <div
                key={e.id}
                className="shrink-0 px-1.5 transition-transform duration-500 ease-out"
                style={{
                  flex: "0 0 85%",
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                }}
              >
                <div style={{ pointerEvents: isDragging ? "none" : "auto" }}>
                  {isNeighbor ? (
                    <ReelCard embed={e} index={i} />
                  ) : (
                    <div className="aspect-[9/16] w-full rounded-2xl bg-white/[0.03] ring-1 ring-white/10" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {active > 0 && (
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(active - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full bg-accent-blue text-white shadow-lg flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {active < items.length - 1 && (
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(active + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full bg-accent-blue text-white shadow-lg flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-accent-blue" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
