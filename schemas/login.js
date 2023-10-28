import z from 'zod'

const loginSchema = z.object({
  email: z.string().email({
    invalid_type_error: 'El correo no tiene formato válido.',
    required_error: 'Correo es requerido.'
  }),
  password: z.string({
    message: 'Contraseña es un campo obligatorio.'
  })
})

export function validateLogin (input) {
  return loginSchema.safeParse(input)
}
