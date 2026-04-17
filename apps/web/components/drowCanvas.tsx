"use client"

import { Game } from "@/draw/game"
import { useEffect, useRef } from "react"

export default function DrowCanva({
  roomId,
  socket,
}: {
  roomId: string
  socket: WebSocket
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const game = new Game(canvas, roomId, socket)

    return () => {
      game.destory()
    }
  }, [])

  return (
    <div className="relative h-screen w-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
