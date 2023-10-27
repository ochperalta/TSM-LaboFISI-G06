import z from 'zod'

const softwareSchema = z.object({
  name: z.string({
    invalid_type_error: 'Laboratory name must be a string',
    required_error: 'Laboratory name is required.'
  }),
  laboratory: z.string(),
  icon: z.string().url({
    message: 'Poster must be a valid URL'
  })
})

export function validateSoftware (input) {
  return softwareSchema.safeParse(input)
}

export function validatePartialSoftware (input) {
  return softwareSchema.partial().safeParse(input)
}
