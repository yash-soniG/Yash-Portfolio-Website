import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export function FadeIn({ children, className = "", as: As = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { rootMargin: "-40px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const Comp: any = As;
  return <Comp ref={ref} className={`fade-up ${seen ? "in-view" : ""} ${className}`}>{children}</Comp>;
}