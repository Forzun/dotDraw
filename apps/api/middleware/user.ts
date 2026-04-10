import type { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"

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
  } catch (error) {
    console.log(error)
    res.status(403).json({
      message: "Incorrect token",
      error: error,
    })
  }
}
