import { useEffect, useRef, useState } from "react"

export default function useSocket() {
  const [connected, setConnected] = useState<boolean>(false)
  const socket = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?token=`)

    ws.onopen = () => {
      setConnected(true)
    }

    ws.onerror = (error) => {
      console.log("error while connecting", error)
      return
    }

    socket.current = ws
    return () => {
      ws.close()
    }
  }, [])

  return { socket, connected }
}
