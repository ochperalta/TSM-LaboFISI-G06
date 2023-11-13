import z from 'zod'

const registerSchema = z.object({
  login: z.string(),
  code: z.string(),
  email: z.string().email(),
  username: z.string(),
  role: z.string()
})

export function validateRegister (input) {
  return registerSchema.safeParse(input)
}
