"use client"

import useSocket from "@/hooks/useSocket"
import { useEffect } from "react"
import DrowCanva from "./drowCanvas"

export default function Socket({ roomId }: { roomId: string }) {
  const { socket, connected } = useSocket()

  useEffect(() => {
    const ws = socket.current

    if (ws == null) {
      return
    }

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_room",
          payload: {
            roomId: roomId,
          },
        })
      )
    }

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [socket, roomId])

  return (
    <div>
      {socket.current && <DrowCanva socket={socket.current} roomId={roomId} />}
    </div>
  )
}
