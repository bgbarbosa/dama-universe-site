"use client";
import { useId, useRef, useState, useEffect, type ReactNode } from "react";

export function HorizontalScroller({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => setEdges({ start: node.scrollLeft <= 1, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2 });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); node.removeEventListener("scroll", update); };
  }, []);
  function scroll(direction: number) {
    const node = ref.current;
    node?.scrollBy({ left: direction * node.clientWidth * 0.85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  return <div>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted">Arraste para explorar ou use os controles.</p>
      <div className="flex gap-2">
        <button type="button" aria-label={`Anterior: ${label}`} aria-controls={id} disabled={edges.start} onClick={() => scroll(-1)} className="min-h-11 min-w-11 rounded-full border border-borderSoft px-4 text-text disabled:opacity-40 focus-ring">←</button>
        <button type="button" aria-label={`Próximo: ${label}`} aria-controls={id} disabled={edges.end} onClick={() => scroll(1)} className="min-h-11 min-w-11 rounded-full border border-borderSoft px-4 text-text disabled:opacity-40 focus-ring">→</button>
      </div>
    </div>
    <div ref={ref} id={id} role="region" aria-label={label} tabIndex={0} className="overflow-x-auto rounded-xl pb-4 focus-ring">
      <div className="flex min-w-full gap-5">{children}</div>
    </div>
  </div>;
}
