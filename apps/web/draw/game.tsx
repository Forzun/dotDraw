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
  private Shapes: Shape[] = []
  private currentShape: Shape | null = null
  private isDrowing = false
  private startX = 0
  private startY = 0
  private ctx: CanvasRenderingContext2D | null = null
  private roomId: string
  private socket: string

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: string) {
    this.canvas = canvas
    this.roomId = roomId
    this.socket = socket
    this.ctx = this.canvas.getContext("2d")
    if (!this.ctx) return
    this.ctx.fillRect(0, 0, canvas.width, canvas.height)
    this.ctx.strokeStyle = "white"
    this.eventHandlers()
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

    this.draw()
  }

  draw = () => {
    if (!this.currentShape || !this.ctx) {
      return
    }

    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.strokeStyle = "white"
    this.ctx.lineWidth = 1

    this.ctx.beginPath()
    this.Shapes.forEach((shape) => {
      this.ctx?.rect(shape.x, shape.y, shape.width, shape.height)
    })
    this.ctx.rect(
      this.startX,
      this.startY,
      this.currentShape?.width,
      this.currentShape?.height
    )
    this.ctx.stroke()
  }

  eventHandlers = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler)
    this.canvas.addEventListener("mousemove", this.mouseMovehandler)
    this.canvas.addEventListener("mouseup", this.mouseUpHandler)
  }
}
