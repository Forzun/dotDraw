"use client"

import { Game } from "@/draw/game"
import { ShapeType } from "@/types/shape-types"
import {
  Circle,
  Diamond,
  Eraser,
  Minus,
  MousePointer,
  Pencil,
  Square,
  Hand,
  type LucideIcon,
  ArrowUpFromDot,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type ShapeProps = {
  type: ShapeType
  icon: LucideIcon
}

const shapes: ShapeProps[] = [
  { type: "default", icon: MousePointer },
  { type: "rect", icon: Square },
  { type: "circle", icon: Circle },
  { type: "diamond", icon: Diamond },
  { type: "pencil", icon: Minus },
  { type: "drow", icon: Pencil },
  { type: "eraser", icon: Eraser },
  { type: "hand", icon: Hand },
  { type: "arrow", icon: ArrowUpFromDot },
]

export default function DrowCanva({
  roomId,
  socket,
}: {
  roomId: string
  socket: WebSocket
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentShape, setCurrentShape] = useState<ShapeType>("default")
  let currentGameRef = useRef<Game | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    currentGameRef.current = new Game(canvas, roomId, socket, currentShape)

    return () => {
      currentGameRef.current?.destory()
    }
  }, [socket, roomId])

  useEffect(() => {
    currentGameRef.current?.setShape(currentShape)
  }, [currentShape])

  return (
    <div
      className="relative h-screen w-full"
      style={{
        backgroundColor: "#1a1a18",
        backgroundImage:
          "radial-gradient(circle, #3a3935 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <ShapeToolbar
        shapes={shapes}
        currentShape={currentShape}
        setCurrentShape={setCurrentShape}
      />
      <canvas
        className="absolute inset-0 h-full w-full"
        style={{ background: "transparent" }}
        ref={canvasRef}
      ></canvas>
    </div>
  )
}

const Tooltip = ({ label }: { label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 6, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 4, scale: 0.9 }}
    transition={{ duration: 0.15, ease: "easeOut" }}
    className="pointer-events-none absolute -bottom-9 left-1/2 z-50 -translate-x-1/2 rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-neutral-200 shadow-xl"
  >
    {label}
    <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-t border-l border-neutral-700 bg-neutral-900" />
  </motion.div>
)

function ShapeToolbar({
  shapes,
  currentShape,
  setCurrentShape,
}: {
  shapes: ShapeProps[]
  currentShape: ShapeType
  setCurrentShape: (type: ShapeType) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-3 right-0 left-0 z-40 mx-auto flex h-12 w-fit items-center justify-center gap-1 rounded-xl bg-neutral-800 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-md"
    >
      {shapes.map((shape: ShapeProps, index: number) => {
        const isActive = currentShape === shape.type
        const isHovered = hoveredIndex === index

        return (
          <motion.div
            key={index}
            className="relative flex items-center justify-center"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            {isActive && (
              <motion.div
                layoutId="active-shape-bg"
                className="absolute inset-0 rounded-lg bg-violet-600/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {isHovered && !isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute inset-0 rounded-lg bg-neutral-700/50"
              />
            )}

            <motion.button
              onClick={() => setCurrentShape(shape.type)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg focus:outline-none"
            >
              <motion.div
                animate={{
                  color: isActive
                    ? "#a78bfa"
                    : isHovered
                      ? "#e5e5e5"
                      : "#a3a3a3",
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.15 }}
              >
                <shape.icon className="h-[15px] w-[15px] text-neutral-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isHovered && shape.type && <Tooltip label={shape.type} />}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
