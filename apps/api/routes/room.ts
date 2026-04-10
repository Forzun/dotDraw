import type { Request, Response } from "express"
import { Router } from "express"
import userMiddleware from "../middleware/user"

const router = Router()

router.post("/create-room", userMiddleware, (req: Request, res: Response) => {})
router.get("/all", userMiddleware, (req: Request, res: Response) => {})

export default router
