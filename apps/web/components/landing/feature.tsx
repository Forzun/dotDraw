"use client"
import { motion } from "motion/react"
import { Users, Infinity as InfinityIcon, Download, Zap } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Real-time collaboration",
    desc: "See teammates' cursors and edits as they happen. No refreshes, no friction.",
    color: "from-violet-500/30 to-violet-500/0",
  },
  {
    icon: InfinityIcon,
    title: "Infinite canvas",
    desc: "Pan, zoom, and sprawl. Your ideas never hit an edge.",
    color: "from-cyan-400/30 to-cyan-400/0",
  },
  {
    icon: Download,
    title: "Export to PNG / SVG",
    desc: "Ship sketches into docs, decks, and PRs with a single click.",
    color: "from-pink-400/30 to-pink-400/0",
  },
  {
    icon: Zap,
    title: "Lightweight & fast",
    desc: "60fps drawing, instant load. Built for thinking at the speed of thought.",
    color: "from-amber-300/30 to-amber-300/0",
  },
]

export function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need.{" "}
            <span className="text-muted-foreground">Nothing you don't.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A whiteboard tuned for clarity, speed, and collaboration.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition"
            >
              <div
                className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${f.color} opacity-0 blur-2xl transition group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <f.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
