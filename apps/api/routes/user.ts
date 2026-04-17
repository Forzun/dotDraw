import type { Request, Response } from "express"
import { Router } from "express"
import { SigninSchema } from "@repo/schema"
import { prisma } from "@repo/database"
import jwt from "jsonwebtoken"

const router: Router = Router()
const JWT_SECRET = process.env.JWT_SECRET as string

router.post("/signin", async (req: Request, res: Response) => {
  const { error, data } = SigninSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    res.status(403).json({
      error: error,
    })
    return
  }
  const { email, password } = data
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    })

    if (!existingUser) {
      res.status(403).json({
        message: "user not exit",
      })
      return
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
      },
      JWT_SECRET
    )
    if (!token) return

    res.status(200).json({
      message: "User signed in successfully",
      token: token,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error."
    console.log(message)
    res.status(403).json({
      message: "Failed to signin user",
      error: message,
    })
  }
})

export default router
