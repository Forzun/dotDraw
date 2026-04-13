import type { ServerWebSocket } from "bun"
import liveUserCount from "./utils/room"

interface User {
  name: string
  room: string[]
  ws: ServerWebSocket
}

const users: User[] = []

let allSocket: Record<string, { name: string; ws: ServerWebSocket[] }> = {}
const server = Bun.serve({
  port: 8080,
  fetch(req, server) {
    const success = server.upgrade(req)
    if (success) {
      return undefined
    }
  },

  websocket: {
    open(ws) {
      console.log("client connect")
      users.push({
        name: "",
        room: [],
        ws: ws,
      })
      ws.send("welcome!")
    },

    message(ws, message) {
      try {
        const row = message.toString()
        const data = JSON.parse(row)
        console.log("Received message", data)

        if (data.type === "join_room") {
          const user = users.find((user) => user.ws === ws)
          if (!user) {
            console.log("user not found")
            return
          }

          user.name = data.payload.name as string
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
          if (!currentUser) return

          const count = liveUserCount(users, data.payload.roomId)

          const message = {
            message: data.payload.message,
            name: data.payload.name,
            count: count,
          }

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
