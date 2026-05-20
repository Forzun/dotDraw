"use client"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="cta" className="relative px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl"
      >
        <div className="glass relative px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(167,139,250,0.35), transparent 50%), radial-gradient(circle at 70% 80%, rgba(103,232,249,0.3), transparent 55%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Start sketching your ideas now
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              No account, no install. Just a blank canvas and your next thought.
            </p>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black shadow-[0_0_60px_-10px_rgba(167,139,250,0.8)] transition"
            >
              Open Canvas
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
