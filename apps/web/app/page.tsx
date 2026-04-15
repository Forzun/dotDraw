"use client"
import { stat } from "fs/promises"
import { useEffect, useRef, useState } from "react"

type Shape = "rect" | "pencil" | "circle"

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState<string>("white")
  const startX = useRef(0)
  const startY = useRef(0)
  const [isMouseDown, setMouseDown] = useState<boolean>(false)
  const [shape, setShape] = useState<Shape>("circle")

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    const ctx = canvas.getContext("2d")
    if (ctx == null) return
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = color

    ctx.lineWidth = 1
  }, [color])

  const onMouseDwon = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setMouseDown(true)
    startX.current = x
    startY.current = y
  }

  const onMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) {
      return
    } else {
      setMouseDown(false)
    }
  }

  const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) {
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const width = x - startX.current
    const height = y - startY.current

    const ctx = canvas.getContext("2d")
    if (ctx == null) return

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = color
    ctx.lineWidth = 1

    if (shape == "circle") {
      const dx = x - startX.current
      const dy = y - startY.current
      const radius = Math.sqrt(dx * dx + dy * dy)
      ctx.beginPath()
      ctx.arc(startX.current, startY.current, radius, 0, 2 * Math.PI, true)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.rect(startX.current, startY.current, width, height)
      ctx.stroke()
    }
  }

  return (
    <div className="relative h-screen w-full">
      <canvas
        onMouseDown={onMouseDwon}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        ref={canvasRef}
        width={500}
        height={500}
      ></canvas>
    </div>
  )
}
