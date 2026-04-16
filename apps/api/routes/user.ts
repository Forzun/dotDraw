import type { Request, Response } from "express"
import { Router } from "express"
import { SignupSchema, SigninSchema } from "@repo/schema"
import { prisma } from "@repo/database"
import jwt from "jsonwebtoken"

const router: Router = Router()
const JWT_SECRET = process.env.JWT_SECRET as string

router.post("/signup", async (req: Request, res: Response) => {
  const { error, data } = SignupSchema.safeParse(req.body)
  if (error) {
    console.log(error)
    res.status(403).json({
      error: error,
    })
    return
  }
  const { email, password, name } = data
  console.log("data:", data)
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      res.status(401).json({
        message: "user already exist",
      })
      return
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    })

    if (!user) {
      res.status(500).json({
        message: "not able to create schema",
      })
      return
    }

    res.status(200).json({
      message: "user created successfully",
    })
  } catch (error) {
    res.status(403).json({
      message: "not able to signin",
      error: error,
    })
  }
})
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
