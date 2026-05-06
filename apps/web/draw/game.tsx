import { ShapeType } from "@/types/shape-types"
import allCanvas from "./getShaps"
import renderSocket, { getExistingShape } from "./socketShaps"

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
  private remoteShapes: Shape[] = []

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
    this.loadInitialShapes()
    this.initSocket()
  }

  private initSocket() {
    this.socket.addEventListener("message", (event) => {
      if (!this.ctx) {
        return
      }
      const message = JSON.parse(event.data)
      if (message.type == "chat") {
        const parsed = JSON.parse(message.message)
        this.remoteShapes.push(parsed.shape)
        allCanvas({
          Shapes: this.remoteShapes,
          ctx: this.ctx,
        })
      }
    })
    this.redraw()
  }

  private async loadInitialShapes() {
    const shapes = await getExistingShape(this.roomId)

    if (shapes) {
      this.remoteShapes = shapes
    }
    this.redraw()
  }

  private redraw() {
    if (!this.ctx) return
    this.ctx.fillStyle = "#171717"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    allCanvas({
      Shapes: this.remoteShapes,
      ctx: this.ctx,
    })
  }

  setShape(shape: ShapeType) {
    this.shapeType = shape
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
        x: this.startX,
        y: this.startY,
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

    if (!this.ctx) {
      return
    }

    renderSocket({
      roomId: this.roomId,
      shape: this.currentShape,
      ctx: this.ctx,
      socket: this.socket,
      remoteShapes: this.remoteShapes,
    })

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
    if (!this.ctx) return

    this.ctx.fillStyle = "#171717"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    allCanvas({
      Shapes: [...this.Shapes, ...this.remoteShapes],
      ctx: this.ctx,
    })

    if (!this.currentShape) return

    this.ctx.beginPath()

    if (this.currentShape.type === "rect") {
      this.ctx.rect(
        this.startX,
        this.startY,
        this.currentShape.width,
        this.currentShape.height
      )
    } else if (this.currentShape.type === "circle") {
      const dx = x - this.startX
      const dy = y - this.startY
      const radius = Math.sqrt(dx * dx + dy * dy)

      this.currentShape.radius = radius

      this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI)
    } else if (this.currentShape.type === "pencil") {
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)

      this.currentShape.x = x
      this.currentShape.y = y
    } else if (this.currentShape.type === "diamond") {
      const width = x - this.startX
      const height = y - this.startY

      this.ctx.moveTo(this.startX + width / 2, this.startY)
      this.ctx.lineTo(this.startX + width, this.startY + height / 2)
      this.ctx.lineTo(this.startX + width / 2, this.startY + height)
      this.ctx.lineTo(this.startX, this.startY + height / 2)
      this.ctx.closePath()
    }

    this.ctx.stroke()
  }

  eventHandlers = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler)
    this.canvas.addEventListener("mousemove", this.mouseMovehandler)
    this.canvas.addEventListener("mouseup", this.mouseUpHandler)
  }
}
