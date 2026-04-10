import z from "zod"

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
})

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const RoomSchema = z.object({
  slug: z.string(),
})

export default {
  SigninSchema,
  SignupSchema,
  RoomSchema,
}
