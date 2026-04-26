import { ShapeType } from "@/types/shape-types"
import allCanvas from "./getShaps"

export type Shape =
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
  | {
      type: "pencil"
      startX: number
      startY: number
      x: number
      y: number
      width: number
      height: number
    }
  | {
      type: "diamond"
      startX?: number
      startY?: number
      x: number
      y: number
      width: number
      height: number
    }

export class Game {
  private canvas: HTMLCanvasElement
  private Shapes: Shape[] = []
  private currentShape: Shape | null = null
  private isDrowing = false
  private startX = 0
  private startY = 0
  private ctx: CanvasRenderingContext2D | null = null
  private roomId: string
  private socket: WebSocket
  private shapeType: ShapeType
  private strokeStyle: string
  private lineWidth: number

  constructor(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket,
    shapeType: ShapeType
  ) {
    this.canvas = canvas
    this.shapeType = shapeType
    this.roomId = roomId
    this.socket = socket
    this.ctx = this.canvas.getContext("2d")
    if (!this.ctx) return
    this.ctx.fillStyle = "#171717"
    this.ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.ctx.strokeStyle = "white"
    this.eventHandlers()
    this.lineWidth = 1
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

    if (this.shapeType === "rect") {
      this.currentShape = {
        type: "rect",
        x,
        y,
        width: 0,
        height: 0,
      }
    }
    if (this.shapeType === "circle") {
      this.currentShape = {
        type: "circle",
        x,
        y,
        radius: 0,
        width: 0,
        height: 0,
      }
    }
    if (this.shapeType === "pencil") {
      this.currentShape = {
        type: "pencil",
        startX: x,
        startY: y,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      }
    }
    if (this.shapeType === "diamond") {
      this.currentShape = {
        type: "diamond",
        x,
        y,
        width: 0,
        height: 0,
      }
    }
  }

  mouseUpHandler = (e: MouseEvent) => {
    if (!this.isDrowing || this.currentShape == null) {
      return
    }

    this.Shapes.push(this.currentShape)

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

    this.draw(x, y)
  }

  draw = (x: number, y: number) => {
    if (!this.currentShape || !this.ctx) {
      return
    }

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.lineWidth = 1

    this.ctx.beginPath()

    if (this.currentShape) {
      allCanvas({
        Shapes: this.Shapes,
        ctx: this.ctx!,
      })
    }

    console.log(this.shapeType)
    if (this.shapeType == "rect") {
      this.ctx.rect(
        this.startX,
        this.startY,
        this.currentShape?.width,
        this.currentShape?.height
      )
      this.ctx.stroke()
    } else if (this.shapeType == "circle") {
      const dx = x - this.startX
      const dy = y - this.startY
      const radius = Math.sqrt(dx * dx + dy * dy)
      this.ctx.beginPath()
      this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI)
      this.ctx.stroke()
    } else if (this.shapeType == "pencil") {
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)
      this.ctx.lineWidth = this.lineWidth
      this.ctx.stroke()
    } else if (this.shapeType == "diamond") {
      console.log("diamond is working or not")
      const width = this.startX - x
      const height = this.startY - y

      this.ctx.beginPath()
      this.ctx.moveTo(x + width / 2, y)
      this.ctx.lineTo(x + width, y + height / 2)
      this.ctx.lineTo(x + width / 2, y + height)
      this.ctx.lineTo(x, y + height / 2)
      this.ctx.closePath()
      this.ctx.stroke()
    }
  }

  eventHandlers = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler)
    this.canvas.addEventListener("mousemove", this.mouseMovehandler)
    this.canvas.addEventListener("mouseup", this.mouseUpHandler)
  }
}
