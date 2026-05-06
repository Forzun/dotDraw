import { Shape } from "./game"
import allCanvas from "./getShaps"

export default async function renderSocket({
  roomId,
  socket,
  shape,
  ctx,
  remoteShapes,
}: {
  roomId: string
  shape: Shape
  ctx: CanvasRenderingContext2D
  socket: WebSocket
  remoteShapes: Shape[]
}) {
  remoteShapes = await getExistingShape(roomId)

  if (!ctx) {
    return
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    if (message.type == "chat") {
      const parsed = JSON.parse(message.message)
      console.log("shape pushed:", parsed.shape)
      remoteShapes.push(parsed.shape)
      allCanvas({
        Shapes: remoteShapes,
        ctx: ctx,
      })
    }
  }

  socket.send(
    JSON.stringify({
      type: "chat",
      payload: {
        message: JSON.stringify({
          shape,
        }),
        roomId: roomId,
      },
    })
  )
}

export async function getExistingShape(roomId: string) {
  try {
    const response = await fetch(`http://localhost:3000/room/${roomId}`, {
      method: "GET",
    })
    const message = await response.json()

    const shapes = message.shapes.map((x: { shape: string }) => {
      const shapesData = JSON.parse(x.shape)
      return shapesData.shape
    })

    console.log("get route ", shapes)
    return shapes || []
  } catch (error) {
    console.log(error)
  }
}
