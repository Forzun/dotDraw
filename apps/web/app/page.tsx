"use client"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState<string>("black")
  const startX = useRef(0)
  const startY = useRef(0)
  const [isMouseDown, setMouseDown] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) return
    const ctx = canvas.getContext("2d")
    if (ctx == null) return
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "white"

    ctx.lineWidth = 1
    ctx.stroke()
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
    const ctx = canvas.getContext("2d")
    if (ctx == null) return
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.rect(startX.current, startY.current, width, height)
    ctx.fillStyle = "white"
    ctx.stroke()
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
