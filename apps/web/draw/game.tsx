import { GitPullRequestArrowIcon, WindArrowDown } from "lucide-react"

type Shape =
  | {
      type: "rect"
      x: number
      y: number
      width: number
      height: number
    }
  | {
      type: "circle"
      radius: number
      x: number
      y: number
      width: number
      height: number
    }

export class Game {
  private canvas: HTMLCanvasElement
  private Shape: Shape[] = []
  private currentShape: Shape | null = null
  private isDrowing = false
  private startX = 0
  private startY = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // this.roomId = roomId
    // this.socket = socket
    canvas.addEventListener("mousedown", this.mouseDownHandler)
    canvas.addEventListener("mousemove", this.mouseMovehandler)
    canvas.addEventListener("mouseup", this.mouseUpHandler)
  }

  destory() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler)
    this.canvas.removeEventListener("mousemove", this.mouseMovehandler)
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.isDrowing = true
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.startX = x
    this.startY = y

    this.currentShape = {
      type: "rect",
      x: x,
      y: y,
      width: 0,
      height: 0,
    }
  }

  mouseUpHandler = (e: MouseEvent) => {
    if (!this.isDrowing || this.currentShape == null) {
      return
    }

    this.Shape.push(this.currentShape)

    this.currentShape = null
    this.isDrowing = false
  }

  mouseMovehandler = (e: MouseEvent) => {
    if (!this.isDrowing || !this.currentShape) {
      return
    }

    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const width = x - this.startX
    const height = y - this.startY

    this.currentShape.width = width
    this.currentShape.height = height

    this.draw()
  }

  draw = () => {
    if (!this.currentShape) {
      return
    }
    const ctx = this.canvas.getContext("2d")
    if (ctx == null) return

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 1

    ctx.beginPath()
    ctx.rect(
      this.startX,
      this.startY,
      this.currentShape?.width,
      this.currentShape?.height
    )
    ctx.stroke()
  }
}
