import type { NextFunction, Response, Request } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/jwt-comman"

export default function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization
  if (!token) {
    console.log("token not found", token)
    res.status(400).json({
      message: "token not found",
      token: token,
    })
    return
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    if (decoded.userId) {
      req.userId = decoded.userId
      next()
    } else {
      res.status(403).json({
        message: "something wrong with",
      })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(403).json({
      message: "Incorrect token",
      error: error,
    })
  }
}
