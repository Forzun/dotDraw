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
      console.log(shape.startX, shape.startY, shape.x, shape.y)
    } else if (shape.type === "diamond") {
      ctx.moveTo(shape.x + shape.width / 2, shape.y)
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height / 2)
      ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height)
      ctx.lineTo(shape.x, shape.y + shape.height / 2)
      ctx.closePath()
    }
    ctx.stroke()
  })
}
