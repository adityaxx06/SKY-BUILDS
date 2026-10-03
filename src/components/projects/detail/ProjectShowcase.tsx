"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { ProjectImage } from "@/features/projects/project-data";

interface ProjectShowcaseProps {
  images: ProjectImage[];
  projectTitle: string;
}

/**
 * Editorial photo showcase for uploaded project images, with an
 * accessible lightbox: Escape closes, arrow keys navigate, focus moves
 * to the close button on open and is contained while open, all
 * controls are labelled, and the layout is single-column on mobile.
 * No animation library — conditional render only, so reduced-motion
 * users get zero motion by construction.
 */
export function ProjectShowcase({ images, projectTitle }: ProjectShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) =>
        current === null ? current : (current + direction + images.length) % images.length
      );
    },
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  if (images.length === 0) return null;
  const current = openIndex !== null ? images[openIndex] : null;

  return (
    <section aria-labelledby="showcase-heading" className="py-16 md:py-24">
      <Reveal>
        <h2
          id="showcase-heading"
          className="font-display mb-10 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold"
        >
          Project Gallery
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {images.map((image, i) => (
          <Reveal key={image.url} delay={Math.min(i, 3) * 0.08} className={i === 0 ? "sm:col-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View image ${i + 1} of ${images.length} fullscreen: ${image.alt || projectTitle}`}
              className="group relative block w-full overflow-hidden rounded-[20px] border text-left transition-transform duration-500 hover:-translate-y-1"
              style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}
            >
              <span className={`relative block w-full ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={image.url}
                  alt={image.alt || `${projectTitle} gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1320px) 50vw, 620px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </span>
              {image.alt && (
                <span
                  className="block truncate px-4 py-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {image.alt}
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      {current && openIndex !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${current.alt || projectTitle}`}
        >
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={close}
            className="absolute inset-0 cursor-zoom-out bg-black/85"
          />
          <figure className="relative z-10 w-full max-w-5xl">
            <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={current.url}
                alt={current.alt || `${projectTitle} fullscreen image`}
                fill
                sizes="100vw"
                className="object-contain"
                style={{ background: "#0b0817" }}
              />
            </span>
            <figcaption
              className="mt-3 flex items-center justify-between gap-4 text-sm"
              style={{ color: "#F5F1EC" }}
            >
              <span className="truncate">
                {current.alt || projectTitle} · {openIndex + 1} / {images.length}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="rounded-full border border-white/20 px-4 py-2 transition-colors hover:bg-white/10"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="rounded-full border border-white/20 px-4 py-2 transition-colors hover:bg-white/10"
                >
                  →
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close image viewer"
                  className="rounded-full border border-white/20 px-4 py-2 transition-colors hover:bg-white/10"
                >
                  ✕
                </button>
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
