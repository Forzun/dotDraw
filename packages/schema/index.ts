import z from "zod"

export const SignupSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
})

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RoomSchema = z.object({
  slug: z.string(),
})

export type SignupInput = z.Infer<typeof SignupSchema>
export type SigninSchema = z.Infer<typeof SigninSchema>
export type RoomSchema = z.Infer<typeof RoomSchema>
