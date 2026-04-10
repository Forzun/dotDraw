import type { Request, Response } from "express"
import { Router } from "express"

const router: Router = Router()

router.post("/singup", (req: Request, res: Response) => {})
router.post("/signin", (req: Request, res: Response) => {})

export default router
