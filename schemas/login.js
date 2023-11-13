import z from 'zod'

const loginSchema = z.object({
  login: z.string(),
  email: z.string().email()
})

export function validateLogin (input) {
  return loginSchema.safeParse(input)
}
