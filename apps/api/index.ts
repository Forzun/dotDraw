import dotenv from "dotenv"
dotenv.config()
import express from "express"
import userRouter from "./routes/user"
import roomRouter from "./routes/room"
import cors from "cors"

const app = express()
const PORT = process.env.BACKEND_URL
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/room", roomRouter)

app.listen(PORT, () => {
  console.log("https server is running!", process.env.BACKEND_URL)
})
process.env.BACKEND_URL
