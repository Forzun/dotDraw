import type { ServerWebSocket } from "bun"

export default function liveUserCount(
  users: {
    name: string
    room: string[]
    ws: ServerWebSocket
  }[],
  roomId: string
) {
  const matchingUser = users.filter((user) => {
    return user.room.includes(roomId)
  })

  if (!matchingUser) {
    return 0
  }

  return matchingUser.length
}
