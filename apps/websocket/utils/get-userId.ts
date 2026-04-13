import jwt, { type JwtPayload } from "jsonwebtoken"

export default function getUserId(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    if (!decoded || !decoded.userId) {
      console.log("decoded token is not received", decoded)
      return
    }

    return decoded.userId
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error."
    console.log(message)
    return null
  }
}
