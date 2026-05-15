import { ShapeType } from "@/types/shape-types"
import allCanvas from "./getShaps"
import renderSocket, { getExistingShape } from "./socketShaps"
import { i } from "motion/react-m"

type actions = "drawing" | "dragging" | "resizing" | "none"
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
  private panY: number = 0
  private panX: number = 0
  private zoom: number = 1
  private SCALE_FACTOR = 0.1
  private action: actions = "none"
  private selectedShape: Shape | null = null
  private shape: MouseEvent | null = null
  private dragOffsetY: number | null = null
  private dragOffsetX: number | null = null
  private allShapes: Shape[] = []
  private resizeHandler: "tl" | "tr" | "bl" | "br" | null = null
  private isPanning: boolean = false
  private lastPenX = 0
  private lastPenY = 0

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
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx.strokeStyle = "white"
    this.eventHandlers()
    this.lineWidth = 1
    this.loadInitialShapes()
    this.initSocket()
  }
  drawSelection = (shape: Shape) => {
    if (!this.ctx) return
    const ctx = this.ctx
    const padding = 10 / this.zoom
    const radius = 8 / this.zoom
    const handleRadius = 5 / this.zoom
    const x = shape.x - padding
    const y = shape.y - padding
    const width = shape.width + padding * 2
    const height = shape.height + padding * 2

    // Selection rectangle
    ctx.beginPath()
    ctx.strokeStyle = "#6965db"
    ctx.lineWidth = 1.5 / this.zoom
    ctx.roundRect(x, y, width, height, radius)
    ctx.stroke()

    // Corner handles
    const handles = [
      { x, y }, // top-left
      { x: x + width, y }, // top-right
      { x, y: y + height }, // bottom-left
      { x: x + width, y: y + height }, // bottom-right
    ]

    handles.forEach(({ x: hx, y: hy }) => {
      ctx.beginPath()
      ctx.arc(hx, hy, handleRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.strokeStyle = "#6965db"
      ctx.lineWidth = 1.5 / this.zoom
      ctx.stroke()
    })
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
        this.redraw()
      }
    })
  }

  private async loadInitialShapes() {
    const shapes = await getExistingShape(this.roomId)

    console.log("shapes", shapes)
    if (shapes) {
      this.remoteShapes = shapes
    }
    this.redraw()
  }

  private redraw() {
    if (!this.ctx) return

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    // this.ctx.fillStyle = "#171717"
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.translate(this.panX, this.panY)
    this.ctx.scale(this.zoom, this.zoom)

    allCanvas({
      Shapes: [...this.Shapes, ...this.remoteShapes],
      ctx: this.ctx,
    })

    if (this.selectedShape) {
      this.drawSelection(this.selectedShape)
    }

    this.allShapes = [...this.Shapes, ...this.remoteShapes]
  }

  setShape(shape: ShapeType) {
    this.shapeType = shape
  }

  destory() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler)
    this.canvas.removeEventListener("mousemove", this.mouseMovehandler)
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler)
    this.canvas.removeEventListener("wheel", this.handleWheel)
  }

  mouseDownHandler = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    if (this.shapeType == "hand") {
      this.isPanning = true

      this.lastPenX = e.clientX
      this.lastPenY = e.clientY
    }

    const screenX = e.clientX - rect.left
    const screenY = e.clientY - rect.top

    const x = (screenX - this.panX) / this.zoom
    const y = (screenY - this.panY) / this.zoom

    this.startX = x
    this.startY = y
    this.shape = e

    const clickedShape = this.getShapeAtPoint(x, y)

    if (this.shapeType == "eraser") {
      if (clickedShape) {
        this.Shapes = this.Shapes.filter((shape) => shape !== clickedShape)
      }

      this.remoteShapes = this.remoteShapes.filter(
        (shape) => shape !== clickedShape
      )
      this.redraw()
      return
    }

    if (this.selectedShape) {
      const handler = this.getResizeHandlePoint(x, y, this.selectedShape)

      console.log("handler here: ", handler)

      if (handler) {
        this.resizeHandler = handler
        this.action = "resizing"
        return
      }
    }

    if (clickedShape) {
      this.selectedShape = clickedShape
      this.action = "dragging"
      this.dragOffsetX = x - this.selectedShape.x
      this.dragOffsetY = y - this.selectedShape.y
      return
    }

    this.isDrowing = true
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
    if (this.shapeType === "hand") {
      this.isPanning = false
      return
    }

    if (this.action === "dragging") {
      this.action = "none"
      return
    }

    if (this.action == "resizing") {
      this.action = "none"
      this.resizeHandler = null
      return
    }

    if (!this.isDrowing || this.currentShape == null || !this.ctx) {
      return
    }

    this.Shapes.push(this.currentShape)

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
    const rect = this.canvas.getBoundingClientRect()

    if (this.isPanning) {
      const dx = e.clientX - this.lastPenX
      const dy = e.clientY - this.lastPenY

      this.panX += dx
      this.panY += dy

      this.lastPenX = e.clientX
      this.lastPenY = e.clientY

      this.redraw()
      this.action = "none"
      return
    }

    const screenX = e.clientX - rect.left
    const screenY = e.clientY - rect.top

    const x = (screenX - this.panX) / this.zoom
    const y = (screenY - this.panY) / this.zoom
    const width = x - this.startX
    const height = y - this.startY

    if (this.selectedShape && this.action == "resizing") {
      const originalX = this.selectedShape.x
      const originalY = this.selectedShape.y
      const originalWidth = this.selectedShape.width
      const originalHeight = this.selectedShape.height

      switch (this.resizeHandler) {
        case "br":
          this.selectedShape.width = x - originalX
          this.selectedShape.height = y - originalY
          break
        case "tl":
          this.selectedShape.width = originalWidth - (x - originalX)
          this.selectedShape.height = originalHeight - (y - originalY)
          this.selectedShape.x = x
          this.selectedShape.y = y
          break
        case "tr":
          this.selectedShape.width = x - originalX
          this.selectedShape.height = originalHeight - (y - originalY)
          this.selectedShape.y = y
          break
        case "bl":
          this.selectedShape.width = originalWidth - (x - originalX)
          this.selectedShape.height = y - originalY
          this.selectedShape.x = x
          break
      }
      if (this.selectedShape.width < 0) {
        this.selectedShape.x += this.selectedShape.width
        this.selectedShape.width = Math.abs(this.selectedShape.width)
      }
      if (this.selectedShape.height < 0) {
        this.selectedShape.y += this.selectedShape.height
        this.selectedShape.height = Math.abs(this.selectedShape.height)
      }

      this.redraw()
      return
    }

    if (this.selectedShape && this.action == "dragging") {
      this.selectedShape.x = x - this.dragOffsetX!
      this.selectedShape.y = y - this.dragOffsetY!
      this.redraw()
      return
    }

    if (!this.isDrowing || !this.currentShape) {
      return
    }

    this.currentShape.width = width
    this.currentShape.height = height
    this.draw(x, y)
  }

  draw = (x: number, y: number) => {
    if (!this.ctx) return

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)

    this.ctx.fillStyle = "#171717"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.setTransform(1, 0, 0, 1, 0, 0)

    this.ctx.translate(this.panX, this.panY)
    this.ctx.scale(this.zoom, this.zoom)

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
  handleWheel = (e: WheelEvent) => {
    e.preventDefault()

    const oldZoom = this.zoom

    if (e.deltaY < 0) {
      this.zoom += 0.1
    } else {
      this.zoom -= 0.1
    }

    this.zoom = Math.max(0.1, Math.min(this.zoom, 5))

    const rect = this.canvas.getBoundingClientRect()

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    this.panX = mouseX - (mouseX - this.panX) * (this.zoom / oldZoom)
    this.panY = mouseY - (mouseY - this.panY) * (this.zoom / oldZoom)

    this.redraw()
  }

  getResizeHandlePoint = (x: number, y: number, shape: Shape) => {
    const size = 10 / this.zoom
    const padding = 10 / this.zoom

    const tlx = shape.x - padding
    const tly = shape.y - padding

    const trx = shape.x + shape.width + padding
    const tryy = shape.y - padding

    const blx = shape.x - padding
    const bly = shape.y + shape.height + padding

    const brx = shape.x + shape.width + padding
    const bry = shape.y + shape.height + padding

    if (
      x >= tlx - size / 2 &&
      x <= tlx + size / 2 &&
      y >= tly - size / 2 &&
      y <= tly + size / 2
    ) {
      return "tl"
    }

    if (
      x >= trx - size / 2 &&
      x <= trx + size / 2 &&
      y >= tryy - size / 2 &&
      y <= tryy + size / 2
    ) {
      return "tr"
    }

    if (
      x >= blx - size / 2 &&
      x <= blx + size / 2 &&
      y >= bly - size / 2 &&
      y <= bly + size / 2
    ) {
      return "bl"
    }

    if (
      x >= brx - size / 2 &&
      x <= brx + size / 2 &&
      y >= bry - size / 2 &&
      y <= bry + size / 2
    ) {
      return "br"
    }

    return null
  }

  getShapeAtPoint = (x: number, y: number) => {
    for (let i = this.allShapes.length - 1; i >= 0; i--) {
      const shape = this.allShapes[i]

      if (!shape) {
        return
      }

      if (
        x >= shape?.x &&
        x <= shape.x + shape.width &&
        y >= shape.y &&
        y <= shape.y + shape.height
      ) {
        return shape
      }
    }
    return null
  }

  eventHandlers = () => {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler)
    this.canvas.addEventListener("mousemove", this.mouseMovehandler)
    this.canvas.addEventListener("mouseup", this.mouseUpHandler)
    this.canvas.addEventListener("wheel", this.handleWheel)
  }
}
