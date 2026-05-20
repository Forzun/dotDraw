"use client"
import { motion } from "motion/react"
import { Pencil } from "lucide-react"

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[min(96%,1100px)] -translate-x-1/2"
    >
      <nav className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
        <a
          href="#"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_24px_-4px_rgba(167,139,250,0.6)]">
            <Pencil className="h-3.5 w-3.5 text-white" />
          </span>
          <span>Scribbl</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">
            Features
          </a>
          <a href="#preview" className="transition hover:text-foreground">
            Preview
          </a>
          <a href="#why" className="transition hover:text-foreground">
            Why Scribbl
          </a>
        </div>
        <a
          href="#cta"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Open Canvas
        </a>
      </nav>
    </motion.header>
  )
}
