import { type ServerWebSocket } from "bun"
import liveUserCount from "./utils/live-user-count"
import getUserId from "./utils/get-userId"
import { prisma } from "@repo/database"

type WsData = {
  userId: string
}
interface User {
  userId: string
  room: string[]
  ws: ServerWebSocket<WsData>
}

const users: User[] = []

let allSocket: Record<string, { userId: string; ws: ServerWebSocket[] }> = {}

const server = Bun.serve<WsData>({
  port: 8080,
  fetch(req, server) {
    const url = new URL(req.url)
    const token = url.searchParams.get("token")

    if (!token) {
      return new Response("not token", { status: 400 })
    }
    const userId = getUserId(token)

    server.upgrade(req, {
      data: {
        userId: userId,
      },
    })

    return new Response("Upgrade failed", { status: 500 })
  },
  websocket: {
    open(ws) {
      console.log("client connect")
      users.push({
        userId: ws.data.userId,
        room: [],
        ws: ws,
      })
    },

    async message(ws, message) {
      try {
        const row = message.toString()
        const data = JSON.parse(row)

        if (data.type === "join_room") {
          const user = users.find((user) => user.ws === ws)

          if (!user) {
            console.log("user not found")
            return
          }

          const roomId = data.payload.roomId as string

          if (!user.room.includes(roomId)) {
            user.room.push(roomId)
          }
        }

        if (data.type === "leave_room") {
          const findUser = users.find((user) => user.ws == ws)
          if (findUser) {
            findUser?.room.filter((x) => x !== data.payload.roomId)
          }
        }

        if (data.type === "chat") {
          const currentUser = users.find((user) => user.ws === ws)
          const userId = ws.data.userId
          if (!currentUser) return

          const count = liveUserCount(users, data.payload.roomId)

          const message = {
            type: data.type,
            message: data.payload.message,
            userId: userId,
            count: count,
          }

          const room = await prisma.room.findFirst({
            where: { slug: data.payload.roomId },
          })

          await prisma.shape.create({
            data: {
              userId: userId,
              shape: data.payload.message,
              roomId: room?.id!,
            },
          })

          users
            .filter((user) => {
              return user.room.includes(data.payload.roomId)
            })
            .forEach((user) => {
              user.ws.send(JSON.stringify(message))
            })
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error"
        console.log(message)
        ws.send(message)
      }
    },

    close(ws, code, reason) {
      console.log("websocket server is close", code, reason)
    },
  },
})

console.log(`Listening on ${server.hostname}:${server.port}`)
