import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function useSocket() {
  const [connected, setConnected] = useState<boolean>(false)
  const socket = useRef<WebSocket | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token === null || token === undefined) {
      console.log("No token found in local storage")
      router.push("/signup")
      return
    }

    const ws = new WebSocket(`ws://localhost:8081?token=${token}`)

    ws.onopen = () => {
      setConnected(true)
    }

    ws.onerror = (error) => {
      console.log("error while connecting", error)
      return
    }

    console.log("connected to server")
    socket.current = ws
    setConnected(true)

    return () => {
      ws.close()
    }
  }, [router])

  return { socket, connected, socketRef: socket }
}
