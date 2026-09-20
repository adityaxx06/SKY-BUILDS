/**
 * A few thin, low-opacity connecting lines threading between the
 * floating cards, with a single small light traveling along one of
 * them. Percentage-based viewBox so it stretches to fill the stage
 * without needing exact pixel coordination with each card's position
 * — these are meant to read as ambient structure, not precise wiring.
 *
 * The traveling-light animation is defined in globals.css
 * (.orbit-light-travel) so it can be disabled under
 * prefers-reduced-motion the same way every other animation in this
 * project is, rather than a one-off inline exception.
 */
export function OrbitLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 18 22 Q 55 10 78 30"
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.22"
        strokeWidth="0.4"
      />
      <path
        d="M 30 55 Q 55 68 70 78"
        fill="none"
        stroke="var(--secondary)"
        strokeOpacity="0.2"
        strokeWidth="0.4"
      />
      <path
        d="M 18 22 Q 55 10 78 30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray="3 140"
        className="orbit-light-travel"
      />
    </svg>
  );
}
