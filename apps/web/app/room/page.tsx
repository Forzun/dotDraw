"use client"

import { Game } from "@/draw/game"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const canvas = canvasRef.current
    if (canvas == null) return
    const game = new Game(canvas, "121", "fsjkadlf")

    return () => {
      game.destory()
    }
  }, [])

  return (
    <div className="relative h-screen w-full">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      ></canvas>
    </div>
  )
}
