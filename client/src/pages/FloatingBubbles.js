type Bubble = {
  size: number
  left: number
  duration: number
  delay: number
  drift: number
  opacity: number
  accent: boolean
}

// Deterministic set so server and client render identically (no hydration mismatch)
const BUBBLES: Bubble[] = [
  { size: 28, left: 6, duration: 16, delay: 0, drift: 24, opacity: 0.5, accent: false },
  { size: 14, left: 14, duration: 12, delay: 3, drift: -18, opacity: 0.45, accent: true },
  { size: 40, left: 22, duration: 20, delay: 6, drift: 30, opacity: 0.4, accent: false },
  { size: 18, left: 33, duration: 14, delay: 1.5, drift: -22, opacity: 0.5, accent: false },
  { size: 24, left: 44, duration: 18, delay: 8, drift: 16, opacity: 0.45, accent: true },
  { size: 12, left: 52, duration: 11, delay: 4, drift: -14, opacity: 0.55, accent: false },
  { size: 34, left: 61, duration: 22, delay: 2, drift: 26, opacity: 0.4, accent: false },
  { size: 16, left: 70, duration: 13, delay: 7, drift: -20, opacity: 0.5, accent: true },
  { size: 22, left: 78, duration: 17, delay: 5, drift: 18, opacity: 0.45, accent: false },
  { size: 30, left: 87, duration: 19, delay: 9, drift: -28, opacity: 0.4, accent: false },
  { size: 14, left: 93, duration: 15, delay: 2.5, drift: 22, opacity: 0.5, accent: true },
]

export function FloatingBubbles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className={`hero-bubble${b.accent ? " accent" : ""}`}
          style={
            {
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              "--bubble-duration": `${b.duration}s`,
              "--bubble-delay": `${b.delay}s`,
              "--bubble-drift": `${b.drift}px`,
              "--bubble-opacity": b.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default FloatingBubbles
