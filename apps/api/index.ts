import express from "express"
import userRouter from "./routes/user"
import roomRouter from "./routes/room"

const app = express()
app.use(express.json())

app.use("/user", userRouter)
app.use("/room", roomRouter)

app.listen(process.env.BACKEND_URL || 3005, () => {
  console.log("https server is running!")
})
