import { Shape } from "./game"

export default function allCanvas({
  Shapes,
  ctx,
}: {
  Shapes: Shape[]
  ctx: CanvasRenderingContext2D
}) {
  Shapes.forEach((shape) => {
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 1

    if (shape.type === "rect") {
      ctx.rect(shape.x, shape.y, shape.width, shape.height)
      ctx.stroke()
    } else if (shape.type === "circle") {
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
      ctx.stroke()
    } else if (shape.type === "pencil") {
      ctx.moveTo(shape.startX, shape.startY)
      ctx.lineTo(shape.x, shape.y)
      ctx.stroke()
    }
  })
}
