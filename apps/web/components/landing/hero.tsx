"use client"
import { motion } from "motion/react"
import { ArrowRight, Play, Sparkles } from "lucide-react"

const shapes = [
  {
    d: "M10 10 H 90 V 60 H 10 Z",
    stroke: "#a78bfa",
    x: "8%",
    y: "20%",
    rotate: -8,
    delay: 0.2,
  },
  {
    d: "M50 5 L95 90 L5 90 Z",
    stroke: "#67e8f9",
    x: "82%",
    y: "25%",
    rotate: 12,
    delay: 0.4,
  },
  {
    d: "M50 50 m-40 0 a40 40 0 1 0 80 0 a40 40 0 1 0 -80 0",
    stroke: "#f472b6",
    x: "12%",
    y: "70%",
    rotate: 0,
    delay: 0.6,
  },
  {
    d: "M5 50 Q 30 5, 55 50 T 95 50",
    stroke: "#fbbf24",
    x: "78%",
    y: "72%",
    rotate: -6,
    delay: 0.8,
  },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      {shapes.map((s, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 100 100"
          width="120"
          height="120"
          initial={{ opacity: 0, scale: 0.6, rotate: s.rotate - 20 }}
          animate={{ opacity: 0.7, scale: 1, rotate: s.rotate }}
          transition={{ duration: 1, delay: s.delay, ease: "easeOut" }}
          className="pointer-events-none absolute hidden md:block"
          style={{ left: s.x, top: s.y }}
        >
          <motion.path
            d={s.d}
            fill="none"
            stroke={s.stroke}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.6,
              delay: s.delay + 0.2,
              ease: "easeInOut",
            }}
            style={{ filter: `drop-shadow(0 0 10px ${s.stroke}80)` }}
          />
        </motion.svg>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300" />
        Now with real-time multiplayer cursors
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-gradient max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
      >
        Draw. Think. Create.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
      >
        A fast, collaborative whiteboard for ideas, sketches, and diagrams.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href="#cta"
          className="group relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_0_40px_-10px_rgba(167,139,250,0.7)] transition hover:shadow-[0_0_60px_-8px_rgba(167,139,250,0.9)]"
        >
          Start Drawing
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
        <a
          href="#preview"
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition hover:bg-white/10"
        >
          <Play className="h-4 w-4" />
          View Demo
        </a>
      </motion.div>
    </section>
  )
}
