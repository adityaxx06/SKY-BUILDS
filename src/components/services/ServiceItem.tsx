"use client";

import { useState } from "react";
import type { Service } from "@/features/services/service-data";

export function ServiceItem({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 md:gap-6 border-b py-6 transition-[padding,background] duration-500"
      style={{
        borderColor: "var(--border)",
        paddingLeft: hovered ? "1rem" : 0,
        background: hovered
          ? `linear-gradient(90deg, ${service.swatch[0]}1a, transparent)`
          : "transparent",
      }}
    >
      <span
        className="font-display w-10 text-[1.1rem] font-semibold transition-transform duration-300"
        style={{
          color: hovered ? service.swatch[0] : "var(--text-muted)",
          transform: hovered ? "rotate(-8deg) scale(1.15)" : "none",
        }}
      >
        {service.id}
      </span>
      <div className="flex-1 min-w-0">
        <span className="font-display text-[1.35rem] md:text-[1.6rem] font-medium">{service.title}</span>
        <p
          className="mt-1 overflow-hidden text-[0.9375rem] transition-all duration-300"
          style={{
            color: "var(--text-muted)",
            maxHeight: hovered ? "3.5rem" : 0,
            opacity: hovered ? 1 : 0,
          }}
        >
          {service.description}
        </p>
      </div>
      <span
        aria-hidden
        className="h-[34px] flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300"
        style={{
          width: hovered ? 52 : 0,
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(135deg, ${service.swatch[0]}, ${service.swatch[1]})`,
        }}
      />
      <span
        aria-hidden
        className="transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          color: "var(--text)",
        }}
      >
        →
      </span>
    </div>
  );
}
