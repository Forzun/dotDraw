"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import {
  MousePointer2,
  Square,
  Circle,
  Pencil,
  Type,
  ArrowUpRight,
  Hand,
} from "lucide-react"

const tools = [
  { icon: Hand, label: "Pan" },
  { icon: MousePointer2, label: "Select", active: true },
  { icon: Square, label: "Rect" },
  { icon: Circle, label: "Ellipse" },
  { icon: ArrowUpRight, label: "Arrow" },
  { icon: Pencil, label: "Draw" },
  { icon: Type, label: "Text" },
]

export function Preview() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8])

  return (
    <section id="preview" ref={ref} className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          A canvas that <span className="text-gradient">feels alive</span>
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Hand-drawn aesthetic, pixel-perfect performance.
        </p>
      </div>

      <motion.div
        style={{ y, rotateX, transformPerspective: 1200 }}
        className="relative mx-auto mt-16 max-w-5xl"
      >
        <div className="glass overflow-hidden rounded-3xl p-2 shadow-[0_30px_120px_-20px_rgba(124,58,237,0.45)]">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-black/30 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="glass flex items-center gap-1 rounded-xl px-1.5 py-1">
              {tools.map((t, i) => (
                <button
                  key={i}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                    t.active
                      ? "bg-white text-black"
                      : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                  aria-label={t.label}
                >
                  <t.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">3 collaborators</span>
              <div className="flex -space-x-1.5">
                <span className="h-6 w-6 rounded-full border-2 border-card bg-violet-400" />
                <span className="h-6 w-6 rounded-full border-2 border-card bg-cyan-400" />
                <span className="h-6 w-6 rounded-full border-2 border-card bg-pink-400" />
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl bg-[#0b0b12] sm:h-[520px]">
            <div className="grid-bg absolute inset-0 opacity-50" />
            <svg
              viewBox="0 0 800 520"
              className="absolute inset-0 h-full w-full"
            >
              {/* Rect */}
              <motion.rect
                x="90"
                y="100"
                width="220"
                height="130"
                rx="10"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
              {/* Arrow */}
              <motion.path
                d="M310 165 C 380 165, 420 230, 500 240"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1 }}
              />
              <motion.path
                d="M490 232 L 510 240 L 492 250"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 2 }}
              />
              {/* Circle */}
              <motion.circle
                cx="580"
                cy="260"
                r="70"
                fill="none"
                stroke="#f472b6"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 2.2 }}
              />
              {/* Squiggle */}
              <motion.path
                d="M120 360 Q 180 320, 240 360 T 360 360 T 480 360"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 3 }}
              />
              {/* Labels */}
              <motion.text
                x="200"
                y="170"
                textAnchor="middle"
                fill="#e9d5ff"
                fontFamily="Inter"
                fontSize="18"
                fontWeight="500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
              >
                Idea
              </motion.text>
              <motion.text
                x="580"
                y="265"
                textAnchor="middle"
                fill="#fce7f3"
                fontFamily="Inter"
                fontSize="18"
                fontWeight="500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3 }}
              >
                Ship it
              </motion.text>
            </svg>

            {/* Live cursors */}
            <motion.div
              initial={{ x: 120, y: 80, opacity: 0 }}
              animate={{
                x: [120, 260, 220, 380],
                y: [80, 140, 220, 200],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute"
            >
              <MousePointer2 className="h-4 w-4 -rotate-12 fill-violet-300 text-violet-300" />
              <span className="ml-2 rounded-md bg-violet-400 px-1.5 py-0.5 text-[10px] font-medium text-black">
                Maya
              </span>
            </motion.div>
            <motion.div
              initial={{ x: 500, y: 320, opacity: 0 }}
              animate={{
                x: [500, 420, 540, 600],
                y: [320, 260, 360, 300],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="pointer-events-none absolute"
            >
              <MousePointer2 className="h-4 w-4 -rotate-12 fill-cyan-300 text-cyan-300" />
              <span className="ml-2 rounded-md bg-cyan-400 px-1.5 py-0.5 text-[10px] font-medium text-black">
                Kai
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
