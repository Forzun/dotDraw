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
    } else if (shape.type === "circle") {
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
    } else if (shape.type === "pencil") {
      ctx.moveTo(shape.startX, shape.startY)
      ctx.lineTo(shape.x, shape.y)
    } else if (shape.type === "diamond") {
      ctx.moveTo(shape.x + shape.width / 2, shape.y)
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2)
      ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height)
      ctx.lineTo(shape.x, shape.y + shape.height / 2)
      ctx.closePath()
    } else if (shape.type === "arrow") {
      const headLength = 15
      const dx = shape.x - shape.startX
      const dy = shape.y - shape.startY
      const angle = Math.atan2(dy, dx)

      ctx.beginPath()
      ctx.moveTo(shape.startX, shape.startY)
      ctx.lineTo(shape.x, shape.y)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(shape.x, shape.y)
      ctx.lineTo(
        shape.x - headLength * Math.cos(angle - Math.PI / 6),
        shape.y - headLength * Math.sin(angle - Math.PI / 6)
      )
      ctx.lineTo(
        shape.x - headLength * Math.cos(angle + Math.PI / 6),
        shape.y - headLength * Math.sin(angle + Math.PI / 6)
      )
      ctx.closePath()
      ctx.fill()
    }
    ctx.stroke()
  })
}
