import type { Request, Response } from "express"
import { Router } from "express"
import userMiddleware from "../middleware/user"
import { RoomSchema } from "@repo/schema"
import { prisma } from "@repo/database"

const router = Router()

router.post(
  "/create-room",
  userMiddleware,
  async (req: Request, res: Response) => {
    const { data, error } = RoomSchema.safeParse(req.body)
    if (error) {
      res.status(403).json({
        message: "Invalid input",
        error: error,
      })
      return
    }
    const { slug } = data
    try {
      const room = await prisma.room.create({
        data: {
          slug: slug,
          adminId: req.userId!,
        },
      })

      if (!room) {
        res.status(403).json({
          message: "unable to create room",
        })
        return
      }

      res.status(200).json({
        message: "room created successfully",
        room: room,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error."
      console.log(message)
      res.status(403).json({
        message: "Failed to signin user",
        error: message,
      })
    }
  }
)
router.get("/all", userMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = req.userId

    if (!adminId) return

    const rooms = prisma.room.findMany({
      where: {
        adminId: adminId,
      },
    })

    res.status(200).json({
      rooms: rooms,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.log(message)
    res.status(403).json({
      message: "Failed to fetch rooms",
      error: message,
    })
  }
})

export default router
