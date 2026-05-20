"use client"
import { motion } from "motion/react"
import { Check } from "lucide-react"

const points = [
  {
    title: "No sign-up required",
    desc: "Open a tab and start sketching. Accounts are optional, not gatekeepers.",
  },
  {
    title: "Instant sharing",
    desc: "One link, live edits. Send a board to anyone, anywhere.",
  },
  {
    title: "Works on all devices",
    desc: "Desktop, tablet, phone. Touch, pen, or mouse — pick your weapon.",
  },
]

export function Why() {
  return (
    <section id="why" className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Built for momentum,
            <br />
            <span className="text-muted-foreground">not for setup.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Scribbl gets out of the way so your ideas can land before they fade.
          </p>
        </motion.div>

        <ul className="space-y-4">
          {points.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass flex gap-4 rounded-2xl p-5"
            >
              <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
