import type { ServerWebSocket } from "bun"

export default function liveUserCount(
  users: {
    userId: string
    room: string[]
    ws: ServerWebSocket<{
      userId: string
    }>
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
